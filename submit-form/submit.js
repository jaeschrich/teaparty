
import { generateName } from '../shared/generateNames';
import { $, $bindEvent, RootNode, cancelEvent, $template } from './layer0';
/* CONSTANTS */

const nameInput = $("[name=name]");
const emailInput = $("[name=email]");
const statement = $("[name=artist-statement]");
const title = $('[role="doc-title"]');
const addButton = $("[name=portfolio]");
const portfolio = $("#file-input-area");
const portfolioTemplate = $template("#portfolio-item");

/* GLOBALS */

let itemCount = 1;
let pos = 0;
let listOfNames = [];
let timeout = null;

/* FUNCTIONS */

let nameText = generateName();
function advanceText() {
    if (timeout) clearTimeout(timeout);
    
    let nextName = generateName();
    while (nameText === nextName) nextName = generateName();
    let end = nameText.lastIndexOf(" ");
    let emailText = nameText.slice(0, end).split(' ').join('') + '.' + nameText.slice(end+1);
    emailText = emailText.toLowerCase() + "@ufl.edu";

    nameInput.placeholder = nameText + ' (for example)'; 
    emailInput.placeholder = emailText;
    statement.placeholder = `They call me ${nameText}, but my real name is ${nextName}.\nDon't tell anyone🤫.`;

    nameText = nextName;
    timeout = setTimeout(advanceText, 10500);
}

/* EVENT HANDLERS & STARTUP */

title.addEventListener('contextmenu', (ev) => {
    if (ev.target === title) {
        cancelEvent(ev);
        advanceText();
    }
});

addButton.addEventListener('click', (ev) => {
    cancelEvent(ev);
    const ref = portfolioTemplate({
        'button': $bindEvent('click', (ev) => {
            cancelEvent(ev);
            portfolio.removeChild(ref);
        }),
        [RootNode]: (el) => el.name = `item-${itemCount++}`
    });
    portfolio.appendChild(ref);
});

advanceText();