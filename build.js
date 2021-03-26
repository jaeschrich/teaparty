const { join } = require('path');
const esbuild = require('esbuild');
const autoprefixer = require("autoprefixer");
const postCssPlugin = require("esbuild-plugin-postcss2").default;

const frontendEntry = join(__dirname, 'frontend', 'client.tsx')
const submitFormEntry = join(__dirname, 'submit-form', 'main.tsx')

function build(overrideOptions = {}) {
    return esbuild.build({
        entryPoints: [ frontendEntry, submitFormEntry ],
        bundle: true,
        outdir: 'dist',
        sourcemap: true,
        logLevel: 'info',
        logLimit: 0,
        loader: { '.svg': 'dataurl' },
        plugins: [
            postCssPlugin({
                plugins: [ autoprefixer ]
            })
        ],
        define: {
            'process.env.NODE_ENV': '"development"'
        },
        ...overrideOptions
    })
}

if (require.main === module) {
    const watch = process.argv.indexOf('--watch') > -1
    build({ watch }).catch(e => {
        console.log(e.message)
        process.exit(1)
    });
}