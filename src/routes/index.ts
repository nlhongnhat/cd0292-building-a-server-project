import express from 'express';
import images from './api/images';
import logger from '../utilities/loggers';

const routes = express.Router();

routes.use('/api/images', images);

routes.get('/', logger, (req, res) => {
  res.send(
    '<h1>Welcome to Image Processing API</h1><p>Please use <code><a href="/api/images">/api/images</a></code> with a valid filename</p>',
  );
});

export default routes;
