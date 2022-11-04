export class ApiError extends Error {
  statusCode: number;
  isOperational?: boolean;
  stack?: string | undefined;

  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true,
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode || 500;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
