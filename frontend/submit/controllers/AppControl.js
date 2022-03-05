
export class AppControl {
    constructor(statementNode, submissionsNode) {
        // load from local storage
        this.statement = "dkjsjds"
        this.submissions = ["One", "two", "three"];

        const frag = document.createDocumentFragment();
        for (let sub of this.submissions) {
            let box = document.createElement("div")
            box.textContent = sub;
            frag.appendChild(box);
        }
        submissionsNode.appendChild(frag);
    }
}