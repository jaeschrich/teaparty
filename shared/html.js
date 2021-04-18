import { isJSDocTypeExpression } from "typescript";

export default (strings, ...values) => {
    let res = [strings[0]]
    for (let i = 0; i < values.length; i++) {
        res.push(values[i]);
        res.push(strings[i+1]);
    }
    let s = res.join('').split('\n');
    while (s.length > 0 && /^\s*$/g.test(s[0])) s.splice(0, 1);
    while (s.length > 0 && /^\s*$/g.test(s[s.length - 1])) s.splice(s.length - 1, 1);
    if (s.length === 0) return "";

    let start = "";
    while (start.length < s[0].length && s[0][start.length] === ' ') start+=" ";
    return s.map(x => start+x.trim()).join("\n")
}