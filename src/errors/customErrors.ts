export class BadRequestError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "BadRequestError";
    }
  }
  
export class NotFoundError extends Error {
constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
}
}

export class InternalServerError extends Error {
constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
}
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
      super(message);
      this.name = "UnauthorizedError";
}
}