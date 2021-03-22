const { join } = require('path');
const esbuild = require('esbuild')
const { main } = require('./server');

export function build() {
    return esbuild.build({
        entryPoints: [join(__dirname, 'frontend', 'client.tsx'), join(__dirname, 'submit-form', 'main.tsx')],
        bundle: true,
        outdir: 'dist',
        sourcemap: true,
        watch: true,
        logLevel: 'info',
        loader: { '.svg': 'dataurl' },
        define: {
            'process.env.NODE_ENV': '"development"'
        }
    })
}

build().then(() => {
    console.log('watching frontend/client.tsx and submit-form/main.tsx')
    return main();
}).then((app: any) => {
    const port = process.env.PORT || '8080';
    app.listen(port);
    console.log(`Server listening at port ${port}!!`); 
     
}).catch(() => process.exit(1))