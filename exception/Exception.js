export class Exceptions extends Error {
  constructor(message) {
    super(message);
    console.error(message);
  }
}
