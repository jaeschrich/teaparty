const { join } = require('path');
const { stat, mkdir } = require('fs/promises');
const esbuild = require('esbuild');
const autoprefixer = require("autoprefixer");
const cssImport = require("postcss-import");
const postCssPlugin = require("esbuild-plugin-postcss2").default;

const frontendEntry = join(__dirname, '..', 'frontend', 'app', 'client.tsx')
const submitFormEntry = join(__dirname, '..', 'frontend', 'submit', 'main.tsx')
const loginEntry = join(__dirname, '..', 'frontend', 'login', 'login.js')
const createAccountEntry = join(__dirname, '..', 'frontend', 'login', 'create-account.js')
const serverEntry = join(__dirname, '..', 'server.tsx');



function build(overrideOptions = {}) {
    let front = esbuild.build({
        entryPoints: [ frontendEntry, submitFormEntry, loginEntry, createAccountEntry ],
        bundle: true,
        outdir: 'dist',
        // minify: true,
        sourcemap: true,
        logLevel: 'info',
        logLimit: 0,
        loader: { '.svg': 'dataurl' },
        plugins: [
            postCssPlugin({
                plugins: [ autoprefixer, cssImport ]
            })
        ],
        define: {
            'process.env.NODE_ENV': '"development"'
        },
        ...overrideOptions
    })

    let back = esbuild.build({
        entryPoints: [serverEntry],
        outdir: ".",
        platform: "node",
        format: "cjs",
        bundle: true
    })

    return Promise.all([front, back])
}

if (require.main === module) {
    const watch = process.argv.indexOf('--watch') > -1
    stat(join(__dirname, '..', 'data', 'files'))
    .then(st => {
        if (!st.isDirectory()) {
            return Promise.reject();
        }
    }).catch((e) => {
        return mkdir(join(__dirname, '..', 'data', 'files'), { recursive: true })
    }).then(() => build({ watch }))
    .catch(e => {
        console.log(e.message)
        process.exit(1)
    });
}