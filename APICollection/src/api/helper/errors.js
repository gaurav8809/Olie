class ValidationError extends Error {
  constructor (message, code = 'ValidationError') {
    super(message);
    this.error_code = code;
  }
}

module.exports = {
  ValidationError
};
