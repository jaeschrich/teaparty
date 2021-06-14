
export class NanoRouter {
    table = {}
    current = null;
    constructor(parent, ...nodes) {
        for (let nodepath of nodes) {
            let node = parent.querySelector(nodepath);
            this.table[nodepath] = node;
            if (nodes[0] === nodepath) this.current = node;
            else node.style.display = "none";
        }
    }

    show(nodepath) {
        let item = this.table[nodepath];
        if (item) {
            if (this.current) this.current.style.display = "none";
            this.current = item;
            this.current.style.display = ""; 
        }
    }

    hideAll() {
        if (this.current) {
            this.current.style.display = "none";
            this.current = null;
        }
    }
}