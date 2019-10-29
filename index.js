import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';

import { C } from './src/common';
import services from './src/services';
import {
  affiliates, course, post, home,
} from './src/pages';
import {
  cacheHtml, error, existsPost, request,
} from './src/middlewares';

dotenv.config();
const { PORT = 3000 } = process.env;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
// -- Statics
app.use('/static', express.static('public'));
app.use(express.static('dist'));
// -- Middlewares
app.use(request);
// -- API
app.use('/api', services);
// -- Services
app.get('/afiliados', cacheHtml, affiliates);
app.get('/curso-blockchain', cacheHtml, course);
app.get('/:postUri', cacheHtml, existsPost, post);
app.get('/', cacheHtml, home);
// -- Error handler
app.use(error);

const listener = server.listen(PORT, () => {
  console.log(`${C.DOMAIN} is ready on port ${listener.address().port}`);
});

['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'].forEach((eventType) => {
  process.on(eventType, () => {
    process.exit();
  });
});
