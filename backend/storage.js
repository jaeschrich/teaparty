import multer from 'multer';
import { nanoid } from 'nanoid';
import { join, extname } from 'path';
import { stat, mkdir } from 'fs/promises';

export const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let authorPrefix = req.session.user.UFID;
        let path = join(__dirname, '..', 'data', 'files', authorPrefix + "_" + req.session.user.id);
        stat(path)
        .then(st => {
            if (!st.isDirectory()) {
                return Promise.reject();
            }
        }).catch((e) => {
            return mkdir(path)
        }).then(() => {
            cb(null, path)
        })
    },
    filename: function(req, file, cb) {
        file.id = nanoid();
        cb(null, file.id + extname(file.originalname));
    }
});

export const upload = multer({ storage });