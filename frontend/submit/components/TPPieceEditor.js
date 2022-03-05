import { template } from '../../shared/index.js';

const templ = template`
<style>
form { 
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}
</style>
<form className="submission-input">
    <div role="group">
        <label for="title">Title</label>
        <input required type="text" name="title" placeholder="Title of Piece" />
    </div>
    <div role="group">
        <label for="category">File</label>
        <tp-file-input name="category"></tp-file-input>
    </div>
    <textarea 
    name="comment"
    placeholder="Optional Artistic comments on piece (medium, location, context, etc.)"></textarea>
    <div role="group">
        <button type="submit" className="red-button">Delete</button>
        <button type="submit">Save</button>
    </div>
</form>   
`;

/**
 * emits save event and delete event
 * TODO look up HTML5 JS validation API and use it
 */
export class TPPieceEditor extends HTMLElement {
    constructor() {
        super();
        attachTemplate(this, templ)
    }
}

customElements.define("tp-piece-editor", TPPieceEditor);