const notFound = async(req, res, next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`);

    res.status(400);
    next(error);
}

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    msg: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {notFound , errorHandler};