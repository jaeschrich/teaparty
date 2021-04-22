import { Router } from 'express';
import { extractFrom } from '../shared';
import { db, getPennameFor, getSubmission, getSubmissions, getUserById, setVote } from './storage';
import html from '../shared/html';

const router = Router();
export = router;

router.get('/state', async (req: any, res) => {
    let subs = await getSubmissions();
    
    subs = await Promise.all(subs.map(async (sub: any) => {
        let author = await getUserById(sub.author);
        let ret = extractFrom(sub, {
            category: true,
            id: true,
            title: true,
            comment: true,   
            votes: true         
        });
        ret.author = extractFrom(author, {
            id: true,
            pronouns: true,
        })
        ret.author.penname = await getPennameFor(author.id)
        ret.vote = sub.votes[req.session.user.id];
        return ret;
    }));

    res.send({ submissions: subs });
});

router.put('/vote', async (req: any, res) => {
    await setVote(req.body.id, req.session.user.id, req.body.vote);
    const votes = (await getSubmission(req.body.id )).votes;
    return res.send({ votes });
});

