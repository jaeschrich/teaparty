
import { makeAutoObservable, observable } from 'mobx';
import { acceptMap } from '../../shared/StorageTypes';
import { nanoid } from 'nanoid';

export type SubmitFile = {
    filename: string;
    value: File|null;
}

export interface ISubmission {
    title: string; 
    comment: string; 
    id: string;
    category: string;
    file: {
        value: null,
        filename: string
    }
}

export class Submissions {
    public submissions: Submission[] = [];
    constructor(fromArr: ISubmission[] = []) {
        makeAutoObservable(this)
        this.submissions = fromArr.map(x => Submission.from(this, x, false, true))
    }

    addSubmission() {
        this.submissions.push(new Submission(this))
    }
    get valid() {
        return this.submissions.length > 0 && this.submissions.filter(x => x.editing).length === 0;
    }
}


export class Submission {
    private _serverSync = false;

    constructor(
        public store: Submissions,
        private _id: string = nanoid(),
        public title: string = "", 
        public comment: string = "", 
        public category: string = "",
        public file: SubmitFile|null = null,
        public editing = true,
        serverSync = false) {
            makeAutoObservable(this, {
                serverSync: false,
                id: false
            });
            this._serverSync = serverSync;
    }

    static from(store: Submissions, { title, comment, category, file, id }: ISubmission, editing?: boolean, serverSync?: boolean) {
        return new Submission(store, id, title, comment, category, file, editing, serverSync)
    }

    get json() {
        let ob: any = {
            id: this.id,
            title: this.title,
            comment: this.comment
        }
        if (this.file && typeof this.file.value === 'string') {
            ob.fileID = this.file.value;
        }
        return ob;
    }

    get serverSync() {
        return this._serverSync;
    }
    get id() {
        return this._id;
    }


    
    *save(): any {
        if (!this.file) return; // should throw
        let data = new FormData();
        data.append('title', this.title);
        data.append('id', this.id);
        data.append('comment', this.comment);
        data.append('category', this.category);
        if (this.file.value) data.append('file', this.file.value);

        let res = yield fetch("/submit/item", {
            method: "PUT",
            body: data
        }).then(res => res.json())
        this.file = { filename: res.filename, value: null } // file on server now
        this._serverSync = true;
        this.editing = false;
    }

    *destroyRemote() {
        yield fetch('/submit/item', {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }, 
            body: JSON.stringify(this.json)
        });
        this.file = null;
    }

    *destroy(): any {
        if (this.serverSync) {
            this.destroyRemote();
        }

        let index = this.store.submissions.indexOf(this);
        this.store.submissions.splice(index, 1);
    }
}

export class State {
    public submissions : Submissions = new Submissions();
    public statement: string = "";
    constructor() {
        makeAutoObservable(this);
    }

    *saveStatement() {
        yield fetch("/submit/statement", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ statement: this.statement })
        });
    }

    *submit() {
        yield this.saveStatement();
        (window.location as any) = "/submitted";

    }

    *load(): any {
        let data = yield fetch("/submit/state").then(res => res.json());
        this.statement = data.statement;
        this.submissions = new Submissions(data.submissions.map((x: any) => {
            x.file.value = null;
            return x;
        }));
    }

    get valid() {
        return this.statement.length > 0 && this.submissions.valid;
    }
}