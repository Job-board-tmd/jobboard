import logger from "../config/winston.config.js";

export const ErrorHandlerMiddleware = (err, _, res, __) => {
  logger.error(err)
  if (err.isException) {
    return res.status(err.status).send({
      message: err.message,
    });
  }
console.log(err)
  res.status(500).send({
    message: err,
  });
};
