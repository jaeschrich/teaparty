const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const processNames = (buf: Buffer) => buf.toString().split("\n").filter(x=>x.trim().length > 0);

const firstNames = processNames(readFileSync(join(__dirname, '..', 'assets', 'first-names.txt')));
const lastNames = processNames(readFileSync(join(__dirname, '..', 'assets', 'last-names.txt')));
const names = JSON.stringify({firstNames, lastNames});

writeFileSync(join(__dirname, '..', 'assets', 'names.json'), names);
writeFileSync(join(__dirname, '..', 'assets', 'all-names-random.json'), JSON.stringify(allNamesRandomized()));

function allNamesRandomized(): [string,string][] {
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