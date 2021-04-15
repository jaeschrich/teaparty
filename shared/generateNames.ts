import { firstNames, lastNames } from '../assets/names.json';

const pronounChoices = ["he/him", "she/her", "he/they", "she/they", "they/he", "they/she", "they/them", "any/all" ];

export function generateName() {
    let ifirstName = Math.floor(Math.random() * firstNames.length);
    let ilastName = Math.floor(Math.random() * lastNames.length);
    return [firstNames[ifirstName], lastNames[ilastName]];
}

export function generatePronouns() {
    return pronounChoices[Math.floor(Math.random() * pronounChoices.length)];
}

export function generateNames(count : number) {
    let names = new Set();
    for (let i = 0; i < count; i++) {
        names.add(generateName());
    }
    return Array.from(names);
}

export class Placeholder {
    firstName: string;
    lastName: string;
    email: string;
    pronouns: string;

    private _next: Placeholder | null;
    
    constructor([ first, last ] = generateName(), pronouns = generatePronouns()) {
        this.firstName = first;
        this.lastName = last;
        this.email = first.toLowerCase() + "." + last.toLowerCase() + "@ufl.edu";
        this._next = null;
        this.pronouns = pronouns;
    }

    get name() { return this.firstName + " " + this.lastName; };
    get text() {
        return `They call me ${this.name}, but my real name is ${this.next.name}.\nDon't tell anyone🤫.`;
    }
    get next() {
        if (!this._next) {
            let [f,l] = generateName();
            while (f+" "+l === this.name) [f,l] = generateName();
            this._next = new Placeholder([f,l])
        }
        return this._next;
    }
}