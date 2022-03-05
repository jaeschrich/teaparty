
export class TPSubmission {
    constructor(id, title, category, file, comment) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.file = file; // type TPFile
        this.comment = comment;
    }
}