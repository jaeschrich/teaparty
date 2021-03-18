
import { generateName } from '../shared/generateNames';

/* CONSTANTS */
const nameInput = document.querySelector("[name=name]");
const emailInput = document.querySelector("[name=email]");
const statement = document.querySelector("[name=artist-statement]");
const title = document.querySelector('[role="doc-title"]');
const addButton = document.querySelector("[name=portfolio]");
const portfolio = document.querySelector("#file-input-area");
const template = document.querySelector("#portfolio-item");
const protip = document.querySelector("#protip-template");

/* GLOBALS */

let itemCount = 1;
let pos = 0;
let listOfNames = [];
let timeout = null;

/* FUNCTIONS */

let nameText = generateName();
function advanceText() {
    if (timeout) clearTimeout(timeout);

    posNext = (pos + 1) % 97;
    
    let nextName = generateName();
    while (nameText === nextName) nextName = generateName();
    let end = nameText.lastIndexOf(" ");
    let emailText = nameText.slice(0, end).split(' ').join('') + '.' + nameText.slice(end+1);
    emailText = emailText.toLowerCase() + "@ufl.edu";

    nameInput.placeholder = nameText; 
    emailInput.placeholder = emailText;
    statement.placeholder = `They call me ${nameText}, but my real name is ${nextName}.\nDon't tell anyone🤫.`;

    nameText = nextName;
    timeout = setTimeout(advanceText, 10500);
}

/* EVENT HANDLERS & STARTUP */

title.addEventListener('contextmenu', (ev) => {
    if (ev.target === title) {
        ev.preventDefault();
        ev.stopPropagation();
        advanceText();
    }
});

addButton.addEventListener('click', (ev) => {
    ev.preventDefault()
    const item = template.content.cloneNode(true);
    let ref = null;
    item.querySelector("button").addEventListener('click', (ev) => {
        ev.preventDefault();
        portfolio.removeChild(ref);
    });
    item.name = `item-${itemCount++}`;
    portfolio.appendChild(item);
    ref = portfolio.lastElementChild;
})

advanceText();