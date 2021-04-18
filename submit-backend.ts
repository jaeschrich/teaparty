import express, { Router } from 'express';
import submit from './views/submit';
import { join } from 'path';
import html from './shared/html';
import addingItem from './views/submit/edit-item';
import { upload } from './backend/storage';
import { nanoid } from 'nanoid';
import { rm } from 'fs/promises';

function requireUncached(module: any) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

let load = (process.env.debug) ? requireUncached : require;

const acceptMap : { [key: string] : string } = ({
    "prose": ".doc,.docx,.pdf,.txt",
    "poetry": ".doc,.docx,.pdf,.txt",
    "photography": ".jpg,.jpeg,.png,.gif",
    "visual-art": ".jpg,.jpeg,.png,.gif"
});


// massive hack
// we're going to store the files table in memory rather create a new db collection
type SubmissionFile = {
    originalname : string, 
    encoding : string, 
    mimetype : string, 
    size : number, 
    destination : string, 
    filename : string, 
    path : string,
}
const fileTable: {[key: string]: SubmissionFile} = {};

type Submission = { 
    file: string; // id
    author: string; // id
    category: "prose"|"poetry"|"visual-art"|"photography";
    id: string;
    title: string;
    comment: string;
}

const submissionsTable: {[key: string]: Submission}  = {};

let freshID = 0;
let submissions = {};
let order = []

const router = Router();

let template = (body: string) => html`
    <!DOCTYPE html>
    <meta charset="utf-8">
    ${body}
    <link rel="stylesheet" href="/assets/LemonMilk/fonts.css" />
    <link rel="stylesheet" href="/dist/submit/main.css" />
    <script src="/assets/js/htmx.js"></script>
    <!-- <script src="/assets/js/confirm-click.js"></script> -->
`;

router.get('/', (req, res) => res.send(template(load('./views/submit').default(Object.values(submissions)))));

router.get('/items', (req, res) => {
    res.send(load('./views/submit/view-items').default(
        Object.values(submissions)
    ));
})
router.get('/edit-item', (req, res) => {
    const id = nanoid();
    res.send(load('./views/submit/edit-item').default({
        submitMethod: `hx-put="/submit/item/${id}"`,
        deleteMethod: `hx-delete="/submit/item/${id}"`
    }));
});

router.get('/edit-item/:id', (req, res) => {
    res.send(load('./views/submit/edit-item').default({
        ...submissionsTable[req.params.id],
        submitMethod: `hx-patch="/submit/item/${req.params.id}"`,
        deleteMethod: `hx-delete="/submit/item/${req.params.id}"`
    }));
});

router.put('/item/:id', (req, res) => {
    const id = req.params.id;
    submissionsTable[id] = {
        id,
        file: req.body.fileID,
        category: req.body.category,
        title: req.body.title,
        author: "FAKE_AUTHOR_ID",
        comment: req.body.comment
    };
    res.send(load('./views/submit/view-item').default(submissionsTable[id]));
})

router.post('/new-item', (req, res) => {
    const id = nanoid();
    submissionsTable[id] = {
        id,
        file: req.body.fileID,
        category: req.body.category,
        title: req.body.title,
        author: "FAKE_AUTHOR_ID",
        comment: req.body.comment
    };
    res.send(load('./views/submit/view-item').default(submissionsTable[id]));
})

router.delete('/item/:id', async (req, res) => {
    if (submissionsTable[req.params.id]) {
        let entry = submissionsTable[req.params.id];
        delete fileTable[entry.file]; // TODO: remove file from HD too
    }
    delete submissionsTable[req.params.id];
    res.send("");
});

router.get('/file', (req, res) => {
    let accept = acceptMap[req.body.category];
    res.send(html`
        <input required type="file" name="file" accept=${accept} />
    `);
})

router.post('/file', upload.single('file'), (req, res) => {
    let id = nanoid();
    fileTable[id] = {
        ...req.file
    }
    res.send(html`
        <span>${req.file.originalname}</span>
    `)
});

router.delete('/file/:id', async (req, res) => {
    await rm(fileTable[req.params.id].path); // super dangerous but it should be ok, because the path comes from multer
    delete fileTable[req.params.id];
    res.send("<p>NO FILE</p>"); // todo, send file input element
});


if (require.main === module) {
    const app = express();
    app.use(express.urlencoded());
    app.use('/dist', express.static(join(__dirname, "/dist")));
    app.use('/assets/twemoji/', express.static(join(__dirname, "/assets", "twemoji")));
    app.use('/assets/js/', express.static(join(__dirname, "/assets", "js")));

    app.use('/assets/svg/', express.static(join(__dirname, "/assets", "svg")));
    app.use('/assets/LemonMilk/', express.static(join(__dirname, "/assets", "LemonMilk")));
    app.use('/submit', router);
    app.listen(process.env.PORT || 8080);
    console.log('listening')
}