import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const REQUEST_ID_HEADER = 'x-request-id';

export const requestId = (req: Request, res: Response, next: NextFunction): void => {
  const providedRequestId = req.get(REQUEST_ID_HEADER) ?? undefined;
  const id = providedRequestId ?? uuidv4();

  req.requestId = id;
  res.setHeader(REQUEST_ID_HEADER, id);

  next();
};
