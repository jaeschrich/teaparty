import html from '../../shared/html';

export default function(props) {
    return html`
        <div data-hx-target="this" data-hx-swap="outerHTML">
            <form ${props.submitMethod} class="submission-input form" >
                <div role="group">
                    <label htmlFor="title">Title</label>
                    <input required type="text" name="title" value="${props.title || ""}" placeholder="Title of Piece" />
                </div>
                <div role="group" style="flex-direction: row;justify-content:space-between" data-hx-target="find input[type=file]">
                    <label for="category">Submission Category</label>
                    <select required data-hx-get="/submit/file" data-hx-params="*" value="${props.category || "prose"}" name="category">
                        <option value="prose">Prose</option>
                        <option value="poetry">Poetry</option>
                        <option value="visual-art">Visual Art</option>
                        <option value="photography">Photography</option>
                    </select>
                    <label for="file">File</label>
                </div>
                <textarea 
                    name="comment"
                    value="${props.comment || ""}"
                    placeholder="Optional Artistic comments on piece (medium, location, context, etc.)" 
                    value=${props.value || ""}></textarea>
                <div role="group" style="flex-direction:row;gap:1rem">
                    <button class="red-button" ${props.deleteMethod}>Delete</button>
                    <button type="submit">Save</button>
                </div>
            </form>
    </div>
    `;
}