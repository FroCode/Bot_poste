class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = "error";
    this.isOperational = true;
  }
}

module.exports = AppError;
