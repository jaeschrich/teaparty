
export function template(strings, ...values) {
    let res = [strings[0]]
    for (let i = 0; i < values.length; i++) {
        res.push(values[i]);
        res.push(strings[i+1]);
    }
    let template = document.createElement("template");
    template.innerHTML = res.join("");
    return template.content;
}