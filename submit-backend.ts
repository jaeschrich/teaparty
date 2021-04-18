import express, { Router } from 'express';
import submit from './views/submit';
import { join } from 'path';
import html from './shared/html';
import addingItem from './views/submit/edit-item';
import { upload } from './backend/storage';
import { nanoid } from 'nanoid';

function requireUncached(module: any) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

let load = (process.env.debug) ? requireUncached : require;

// massive hack
// we're going to store the files table in memory rather create a new db collection
type SubmissionFile = {
    originalname : string, 
    title: string,
    encoding : string, 
    mimetype : string, 
    size : string, 
    destination : string, 
    filename : string, 
    path : string,
    category: string,
    commentary: string
}
const fileTable: {[key: string]: SubmissionFile} = {};

type Submission = { 
    file: SubmissionFile;
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
router.get('/new-item', (req, res) => {
    res.send(load('./views/submit/edit-item').default({
        submitMethod: `hx-post="/item"`,
        deleteMethod: `hx-get="/items" hx-target="file-input-area"`
    }));
});

router.put('/item/:id', (req, res) => {
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

router.post('/item/:id', (req, res) => {
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


router.patch('/item/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let old = submissionsTable[id]
    submissionsTable[id] = {
        ...old,
        title: req.body.title,
        category: req.body.category,
        comment: req.body.comment.trim(),
        complete: !!old.filename
    }

    return res.send()
});

router.delete('/item/:id', (req, res) => {
    let id = parseInt(req.params.id)
    delete submissions[id];
    res.send("");
});

router.post('/file/:id', upload.single('file'), (req, res) => {
    req.file
});

router.delete('/file/:id', (req, res) => {

})


if (require.main === module) {
    const app = express();
    app.use(express.json());
    app.use('/dist', express.static(join(__dirname, "/dist")));
    app.use('/assets/twemoji/', express.static(join(__dirname, "/assets", "twemoji")));
    app.use('/assets/js/', express.static(join(__dirname, "/assets", "js")));

    app.use('/assets/svg/', express.static(join(__dirname, "/assets", "svg")));
    app.use('/assets/LemonMilk/', express.static(join(__dirname, "/assets", "LemonMilk")));
    app.use('/submit', router);
    app.listen(process.env.PORT || 8080);
    console.log('listening')
}