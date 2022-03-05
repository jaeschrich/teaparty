
export class TPFile {
    constructor(id, name, category) {
        this.name = name;
        this.id = id;
        this.category = category;
    }

    destroy() {
        // TODO delete from server
    }

    static fromDOMFile(file, category) {
        // TODO save file to server
        let id = (Math.random()*1000).toString();
        return new TPFile(id, file.name, category);
    }
}