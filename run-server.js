import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
// Change this based on your astro.config.mjs, `base` option.
// They should match. The default value is "/".
const base = '/';
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.listen(7000, ()=> console.log('Server started on port 3000'));
