import logger from "../config/winston.config.js"

function dublicateFieldError(err) {
  if (err?.code === 11000) {
    err.status = 409;
    err.isException = true;
    err.message = `Ushbu: "${Object.values(err.keyValue).join(
      ", "
    )}" qiymatlari allaqachon ishlatilgan`;
  }

  return err;
}



export const ErrorHandlerMiddleware = (err, _, res, __) => {
  logger.error(err)


  err = dublicateFieldError(err);

  if (err.isException) {
    return res.status(err.status).send({
      message: err.message,
    });
  }

  res.status(500).send({
    message: err,
  });
};
