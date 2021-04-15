import { Placeholder } from '../../shared/generateNames';
let place = new Placeholder();
let email = document.querySelector("[name=email]")
let change = document.querySelector("img");
function writePlace() {
    place = place.next;
    email.setAttribute('placeholder', place.email);
} 
change.addEventListener("click", () => {
    writePlace();
})
writePlace();