
import { template } from '../../shared/templateHelper.js';

const cctemplate = template`
<style>
    #confirm-panel { display: flex; }
    span { margin: 0; padding: 0; }
    #accept { width: 50%; display: none; }
    #reject { width: 50%; display: none; }
    #initial { width: 100%; }
    slot { display: inline-block; }
    .confirming > #accept { display: inline-block; }
    .confirming > #reject { display: inline-block; }
    .confirming > #initial { display: none; }
    ::slotted(*) { width: 100%; margin: 0; }
</style>
<div id="confirm-panel">
    <slot name="initial" id="initial" >Initial</slot>
    <slot name="accept" id="accept">Accept</slot>
    <slot name="reject" id="reject">Reject</slot>
</div>
`;

class ConfirmClick extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(cctemplate.cloneNode(true));
        console.log(shadowRoot)
        let top = shadowRoot.querySelector("#confirm-panel");
        let accept = this.querySelector("button[slot=accept]")
        accept.addEventListener("click", (ev) => {
            top.className = "";
            this.dispatchEvent(new CustomEvent("confirm"));
        });
        let reject = this.querySelector("button[slot=reject]")
        reject.addEventListener("click", (ev) => {
            top.className = "";
        });
        let initial = this.querySelector("button[slot=initial]")
        initial.addEventListener("click", ev => {
            top.className = "confirming";
        });
    }
}

customElements.define("confirm-click", ConfirmClick)