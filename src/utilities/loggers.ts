import express from 'express';

const logger = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const { method, url } = req;
  const log = `${method} ${url}`;
  console.log(log);
  next();
};

export default logger;
