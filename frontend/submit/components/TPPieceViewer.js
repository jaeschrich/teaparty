import { template } from '../../shared/index.js';

const templ = template`
<style>
    #controls {
        display: flex;
        flex-direction: "row";
    }
</style>
<div role="region" class="submission">
    <SubmissionInfo value={value} />
    <div role="group" class="controls">
        <div id="controls">
            <confirm-click>
                <button slot="initial" class="red-button">Delete</button>
                <button slot="accept" class="red-button">Confirm?</button>
                <button slot="reject">Cancel</button>
            </confirm-click>
        </div>
        <div><button id="edit-button">Edit</button></div>
    </div>
</div>  
`;

/**
 * emits edit and delete event
 */
export class TPPieceViewer extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define("tp-piece-viewer", TPPieceViewer);