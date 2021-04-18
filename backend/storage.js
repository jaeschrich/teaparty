import mutler from 'multer';

export const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        let authorPrefix = req.body.UFID.split('').filter((c) => c in "0123456789".split('')).join('');
        let path = join(__dirname, 'data', 'files', authorPrefix);
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
        cb(null, (randomBytes(8).toString('hex')) + extname(file.originalname));
    }
});

export const upload = multer({ storage });