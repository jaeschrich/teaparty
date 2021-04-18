
import html from '../../shared/html';

export default function(item) {
    return html`
        <div role="region" className="submission">
            <div class="submission-info">
                <div class="submission-info-header">
                    <span arial-label="title">&ldquo;${item.title}&rdquo;</span>
                    <span aria-label="category">${item.category}</span>
                </div>
                <p aria-label="file name">${item.filename}</p>
                ${(item.comment.length>0)?`<div class="submission-info-comment"><span>${item.comment}</span></div>`:``}
            </div>
            <div role="group" className="controls">
                <div style="display:inline-flex; flex-direction:row">
                    <button class="red-button confirm-click">
                        <button hx-delete="/item/${item.id}" class="red-button">Confirm?</button>
                        <button>Cancel</button>
                        <span>Delete</span>
                    </button>
                </div>
                <div>
                    <button hx-patch="/item/${item.id}">Edit</button>
                </div>
            </div>
        </div>
    `;
}