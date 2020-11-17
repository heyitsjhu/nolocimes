/**
 *
 * @class
 * @classdesc A custom Dreamist Labs error class.
 */
class DLError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default DLError;
