const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const { Buffer } = require("buffer");

const processNames = (buf) => buf.toString().split("\n").filter(x=>x.trim().length > 0);

const firstNames = processNames(readFileSync(join(__dirname, '..', 'assets', 'first-names.txt')));
const lastNames = processNames(readFileSync(join(__dirname, '..', 'assets', 'last-names.txt')));
const names = JSON.stringify({firstNames, lastNames});

writeFileSync(join(__dirname, '..', 'assets', 'names.json'), names);