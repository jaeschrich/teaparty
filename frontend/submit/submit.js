
import './components/index.js';
import { template } from '../shared/index.js';
import { TPFile } from './models/TPFile.js';
import { AppControl } from './controllers/AppControl.js';

const subs = document.querySelector("#submissions");
const add = document.querySelector("#add-item")
const fp = document.querySelector("tp-file-input");

fp.addEventListener("set", (ev) => {
    let f = TPFile.fromDOMFile(ev.detail, "prose");
    console.log(f)
    ev.target.setFile(f)
});

fp.addEventListener("unset", (ev) => {
    console.log(ev.detail);
    ev.target.setFile(null);
})

const app = new AppControl(subs, subs);