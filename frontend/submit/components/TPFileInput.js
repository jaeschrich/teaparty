import { acceptMap } from '../../../shared/StorageTypes.js';
import { template, event, attachTemplate } from '../../shared/index.js';
import { FileManager } from '../state.js';
import { NanoRouter } from './NanoRouter.js';

const tmpl = template`
    <style>
        input[type=file] {
            opacity: 0;
            z-index: -1;
            position: absolute;
            width:0;
            height:0;
        }
    </style>
    <div id="file-input">
        <input type="file" />
        <button data-value="prose">Prose</button>
        <button data-value="poetry">Poetry</button>
        <button data-value="visual-art">Visual Art</button>
        <button data-value="photography">Photography</button>
    </div>
    <div id="file-preview">
        <span id="file-name"></span>
        <button id="change">Change</button>
    </div>
`;

/**
 * Example Usage
 * File on server:
 *  let x = <tp-file-input></tp-file-input> 
 *  x.setFile(new TPFile(id, name, category))
 * File Empty
 *  <tp-file-input></tp-file-input>
 */
class TPFileInput extends HTMLElement {
    router = null;
    file = null;
    constructor() {
        super();
        const shadowRoot = attachTemplate(this, tmpl)

        this.router = new NanoRouter(shadowRoot, "#file-input", "#file-preview");

        let fileInput = this.shadowRoot.querySelector("input[type=file]");
        for (let button of this.shadowRoot.querySelectorAll("#file-input button")) {
            button.addEventListener("click", (ev) => {
                let type = ev.target.dataset.value;
                
                fileInput.dataset.category = type;
                fileInput.accept = acceptMap[type];
                // TODO: Make file input only accept the right file types
                fileInput.click()
            });
        }
        fileInput.addEventListener("change", async (ev) => {
            ev.preventDefault();
            if (!fileInput.files || !fileInput.files.length > 0) {
                return;
            }
            const file = fileInput.files[0];

            this.dispatchEvent(event("set", file));
        });

        shadowRoot.querySelector("#change").addEventListener("click", () => {
            this.dispatchEvent(event("unset", this.file));
        });
    }

    setFile(file) {
        this.file = file;
        if (file === null) {
            this.router.show("#file-input");
        } else {
            this.shadowRoot.querySelector("#file-name").textContent = file.name;
            this.router.show("#file-preview");
        }
    }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     if (name === "file-id") {
    //         this.setFile(this.getAttribute("file-id"));
    //     }
    // }
    // static get observedAttributes() { return ['file-id'] }
}

customElements.define("tp-file-input", TPFileInput);