import { startServer } from './server';
import { join } from 'path';
import Bundler from 'parcel-bundler';

const entryFile = join(__dirname, 'frontend', 'client.tsx');
const bundler = new Bundler(entryFile, {
    publicUrl: "/dist/"
});
process.env.NODE_ENV = "development";
bundler.bundle().then(() => {
    startServer(8000);
});