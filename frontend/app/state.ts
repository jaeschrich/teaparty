import { makeAutoObservable } from 'mobx';
import { VoteType } from 'shared/StorageTypes';

export class Submission {

    constructor(
        private _id: string,
        public title: string, 
        public comment: string, 
        public category: string,
        public author: {
            name: string,
            id: string
            penname: [string, string]
        },
        public vote: string,
        public votes: { [key: string]: VoteType },
        public file: string) {
            makeAutoObservable(this);
    }

    get id() { return this._id; }

    get authorName() {
        return this.author.penname.join(" ");
    }

    *setVote(vote: 'yes'|'no'|'abstain'): Generator<Promise<any>, any, any> {
        let oldVote = vote;
        this.vote = vote;
        let res = yield fetch("/api/vote", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: this.id,
                vote
            })
        })
        if (res.status !== 200) {
            this.vote = oldVote; // an error occured, reset to old vote
        } else {
            res = yield res.json()
            this.votes = res.votes;
        }
    }
}

export class State {
    constructor(
        public submissions : Submission[]
    ) {
        makeAutoObservable(this);
    }

    *load(): any {
        let res = yield fetch("/api/state").then(res => res.json())
        this.submissions = res.submissions.map((sub : any) => {
            return new Submission(sub.id, sub.title, sub.comment, sub.category, sub.author, sub.vote, sub.votes, sub.file);
        });
    }
}