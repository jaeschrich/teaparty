
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

    let start = 0;
    while (start < s[0].length && s[0][start] === ' ') start++;
    return s.map(x => {
        let i;
        for (i = 0; i < start; i++) {
            if (x[i] !== ' ') break;
        }
        return x.slice(i)
    }).join("\n")
}