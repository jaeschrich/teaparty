


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
function refreshNames() {
    return fetch("/names?count=97").then(res => res.text()).then(text => {
        pos = 0;
        listOfNames = JSON.parse(text).map(name => {
            let end = name.lastIndexOf(" ");
            let email = name.slice(0, end).split(' ').join('') + '.' + name.slice(end+1);
            return { name: name, email: email.toLowerCase() + "@ufl.edu" };
        })
    })
}

function advanceText() {
    if (timeout) clearTimeout(timeout);

    posNext = (pos + 1) % 97;
    let nameText = listOfNames[pos].name;
    let emailText = listOfNames[pos].email;
    let nextName = Promise.resolve(listOfNames[posNext].name);
    if (posNext == 0) {
        nextName = refreshNames(false).then(() => listOfNames[0].name).catch(e => listOfNames[posNext].name);
    }
    nextName.then(nextName => {
        if (listOfNames.length > 0) {
            nameInput.placeholder = nameText; 
            emailInput.placeholder = emailText;
            statement.placeholder = `They call me ${nameText}, but my real name is ${nextName}.\nDon't tell anyone🤫.`;
        }
        pos = posNext;
        timeout = setTimeout(advanceText, 20000);
    });
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

refreshNames().then(advanceText);