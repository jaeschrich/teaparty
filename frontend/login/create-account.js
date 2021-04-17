import { Placeholder } from '../../shared/generateNames';
let place = new Placeholder();
let name = document.querySelector("[name=name]")
let email = document.querySelector("[name=email]")
let pronouns = document.querySelector("[name=pronouns]")

let change = document.querySelector("img");

function writePlace() {
    place = place.next;
    name.setAttribute('placeholder', place.name);
    pronouns.setAttribute('placeholder', place.pronouns);
    email.setAttribute('placeholder', place.email);
} 
change.addEventListener("click", () => {
    writePlace();
})
writePlace();