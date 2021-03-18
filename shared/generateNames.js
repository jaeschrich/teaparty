import firstNamesRaw from '../assets/place-names.txt';
import lastNamesRaw from '../assets/last-names.txt';

const firstNames = firstNamesRaw.toString().split("\n").filter(x => x.trim().length>0);
const lastNames = lastNamesRaw.toString().split("\n").filter(x=>x.trim().length>0);

export function generateName() {
    let ifirstName = Math.floor(Math.random() * firstNames.length);
    let ilastName = Math.floor(Math.random() * lastNames.length);
    return firstNames[ifirstName] + " " + lastNames[ilastName];
}

export function generateNames(count) {
    let names = new Set();
    for (let i = 0; i < count; i++) {
        names.add(generateName());
    }
    return Array.from(names);
}
