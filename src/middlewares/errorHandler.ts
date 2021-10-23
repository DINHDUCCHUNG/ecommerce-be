import { NextFunction, Request, Response } from 'express';
import codes from '../errors/codes';
import getErrorMessage from '../errors/getErrorMessage';

// eslint-disable-next-line no-unused-vars
const errorHandler = (
  err: { code: number; statusCode: number; details: any; message: any },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.code || err.statusCode;
  let { message } = err;
  let details;
  const code = err.code || err.statusCode || codes.INTERNAL_SERVER_ERROR;
  switch (code) {
    case codes.BAD_REQUEST:
      message = message || 'Bad Request';
      details = err.details;
      break;
    case codes.UNAUTHORIZED:
      message = 'Unauthorized';
      break;
    case codes.FORBIDDEN:
      message = 'Forbidden';
      break;
    case codes.NOT_FOUND:
      message = 'Not Found';
      break;
    case codes.TOO_MANY_REQUESTS:
      message = 'Too many requests';
      break;
    case codes.INTERNAL_SERVER_ERROR:
      statusCode = codes.INTERNAL_SERVER_ERROR;
      message = message || 'Something went wrong';
      break;
    case codes.DUPLICATE:
      statusCode = codes.INTERNAL_SERVER_ERROR;
      message = message || 'Duplicate';
      break;
    default:
      message = message || getErrorMessage(code);
      statusCode = 200;
  }
  return res.status(statusCode).json({
    status: 'fail',
    message: message,
    statusCode: statusCode,
    details: details,
  });
};

export default errorHandler;
