import { firstNames, lastNames } from '../assets/names.json';

export function generateName() {
    let ifirstName = Math.floor(Math.random() * firstNames.length);
    let ilastName = Math.floor(Math.random() * lastNames.length);
    return firstNames[ifirstName] + " " + lastNames[ilastName];
}

export function generateNames(count : number) {
    let names = new Set();
    for (let i = 0; i < count; i++) {
        names.add(generateName());
    }
    return Array.from(names);
}
