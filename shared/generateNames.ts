import { firstNames, lastNames } from '../assets/names.json';

const pronounChoices = ["he/him", "she/her", "he/they", "she/they", "they/he", "they/she", "they/them", "any/all" ];

export function allNamesRandomized(): [string,string][] {
    let names: [string,string][] = [];
    let map = new WeakMap<[string, string], number>();
    for (let first of firstNames) {
        for (let last of lastNames) {
            let x : [string,string] = [first, last]
            names.push(x);
            map.set(x, Math.random());
        }
    }
    return names.sort((a: [string,string], b:[string,string]) => {
        let na = map.get(a) as number;
        let nb = map.get(b) as number;
        if (na < nb) return -1
        else if (na === nb) return 0;
        else return 1;
    });
}

export function generateName(): [string,string] {
    let ifirstName = Math.floor(Math.random() * firstNames.length);
    let ilastName = Math.floor(Math.random() * lastNames.length);
    return [firstNames[ifirstName], lastNames[ilastName]];
}

export function generatePronouns() {
    return pronounChoices[Math.floor(Math.random() * pronounChoices.length)];
}

export function generateNames(count : number): [string, string][] {
    let names = new Set<[string,string]>();
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
        this.email = first.toLowerCase().replace(" ", ".") + "." + last.toLowerCase().replace(" ", ".")+ "@ufl.edu";
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