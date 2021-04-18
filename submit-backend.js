import express, { Router } from 'express';
import submit from './views/submit';
import { join } from 'path';
import html from './shared/html';
import addingItem from './views/submit/edit-item';

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

let load = (process.env.debug) ? requireUncached : require;

let freshID = 0;
let submissions = {};
let order = []

const router = new Router();
let template = (body) => html`
    <!DOCTYPE html>
    <meta charset="utf-8">
    ${body}
    <link rel="stylesheet" href="/assets/LemonMilk/fonts.css" />
    <link rel="stylesheet" href="/dist/submit/main.css" />
    <script src="/assets/js/htmx.js"></script>
    <!-- <script src="/assets/js/confirm-click.js"></script> -->
`;

router.get('/', (req, res) => res.send(template(load('./views/submit').default())));
router.post('/item', (req, res) => {
    const id = freshID++;
    submissions[id] = {
        id,
        complete: false
    };
    order.push(id);
    res.send(load('./views/submit/edit-item').default(submissions[id]));
});

router.patch('/item/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let old = submissions[id]
    submissions[id] = {
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

router.post('/file/:id', (req, res) => {
    // handle getting file
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