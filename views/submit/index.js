
import html from '../../shared/html';
import viewItems from './view-items';

export default function(submissions) {
    return html`
        <div id="file-input-toolbar">
            <button
                id="submit"
                style="width: 20ch"
                class="green-class"
                disabled="!valid">
                <span style="text-align:center">Submit to TEA</span></button>

            <button style="margin-left: auto" 
                    data-hx-get="/submit/edit-item" 
                    data-hx-target="#file-input-area" id="add-item-button" data-hx-swap="afterbegin">Add Item</button>
        </div>
        <div id="form">
            <div role="region" id="file-input-area" class="form">
            ${viewItems(submissions)}
            </div>
        </div>
    `;
}