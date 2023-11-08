import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

class ResponseError<T> extends Error {
  private code: number;
  private type?: string;

  constructor(error: T | Error, statusCode: keyof typeof StatusCodes & string) {
    super();

    this.code = StatusCodes[statusCode];
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      this.type = error.code;
      this.message = error.message;
    } else if (error instanceof Error) {
      this.type = error.name;
      this.message = error.message;
    } else {
      this.type = 'Generic Error';
      this.message = error as string;
    }

    (Error as ErrorConstructor).captureStackTrace(this, this.constructor);
    throw {
      error: true,
      message: this.message,
      code: this.code,
      type: this.type,
    };
  }
}

export default ResponseError;
