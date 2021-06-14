
import './components/index.js';
import { template } from '../shared/templateHelper.js';
const subs = document.querySelector("#submissions");
const add = document.querySelector("#add-item")
let x = template`
    <p>Hello!</p>
`;
class Portfolio {
    pieces = []
    statement = ""

    addPiece() {
        subs.appendChild(x.cloneNode(true));
    }
}

let port = new Portfolio();
add.addEventListener("click", () => port.addPiece())