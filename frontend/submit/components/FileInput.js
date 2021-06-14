import { template } from '../../shared/templateHelper.js';
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
        <button>Change</button>
    </div>
`;

/**
 * Example Usage
 * File on server:
 *  <tp-file-input file-id="d2aAkfdk34jf"></tp-file-input> 
 * File Empty
 *  <tp-file-input></tp-file-input>
 */
class TPFileInput extends HTMLElement {
    router = null;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(tmpl.cloneNode(true));

        this.router = new NanoRouter(shadowRoot, "#file-input", "#file-preview");

        for (let button of shadowRoot.querySelectorAll("#file-input button")) {
            button.addEventListener("click", (ev) => {
                let type = ev.target.dataset.value;
                let fi = this.shadowRoot.querySelector("input[type=file]");
                fi.dataset.category = type;
                // TODO: Make file input only accept the right file types
                fi.click()
            });
        }
        shadowRoot.querySelector("input[type=file]").addEventListener("change", async (ev) => {
            // let id = await FileManager.uploadFile
            this.setFile("sdkfalj2") // setFile(id)
        });
        if (this.hasAttribute("file-id")) {
            this.setFile(this.getAttribute('file-id'));
        } else {
            this.setFile(null);
        }
    }

    setFile(fileID) {
        if (fileID === null) {
            this.router.show("#file-input");
        } else {
            let name = "TEST"; // FileManager.files[fileID].name;
            this.shadowRoot.querySelector("#file-name").textContent = name;
            this.router.show("#file-preview");
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "file-id") {
            this.setFile(this.getAttribute("file-id"));
        }
    }
    static get observedAttributes() { return ['file-id'] }
}

customElements.define("tp-file-input", TPFileInput);