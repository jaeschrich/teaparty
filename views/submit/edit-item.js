import html from '../../shared/html';

export default function(props) {
    return html`
        <div>
            <form ${props.submitMethod} class="submission-input form">
                <div role="group">
                    <label htmlFor="title">Title</label>
                    <input required type="text" name="title" value="${props.sub.title} placeholder="Title of Piece" />
                </div>
                <div role="group" style="flex-direction: row;justify-content:space-between">
                    <label for="category">Submission Category</label>
                    <select required value="${props.sub.category}" name="category">
                        <option value="prose">Prose</option>
                        <option value="poetry">Poetry</option>
                        <option value="visual-art">Visual Art</option>
                        <option value="photography">Photography</option>
                    </select>
                </div>
                <div role="group" style="flex-direction: row; justify-content: space-between;">
                    <label for="file">File</label>
                    <!-- <input required type="file" name="file" accept=${props.accept || ""} /> -->
                </div>
                <textarea 
                    name="comment"
                    value="${props.sub.comment}"
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