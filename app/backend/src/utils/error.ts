import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

class ResponseError<T> extends Error {
  code: number;
  type?: string;
  error: boolean;
  name: string;

  constructor(error: T | Error, statusCode: keyof typeof HttpStatus & string) {
    super();

    this.code = HttpStatus[statusCode];
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      this.type = error.code;
      this.message = error.message;
      this.name = error.name;
    } else if (error instanceof Error) {
      this.type = error.name;
      this.message = error.message;
      this.name = error.name;
    } else {
      this.type = 'Generic Error';
      this.name = 'Generic Error';
      this.message = error as string;
    }

    (Error as ErrorConstructor).captureStackTrace(this, this.constructor);
    return {
      error: true,
      name: this.name,
      message: this.message,
      code: this.code,
      type: this.type,
    };
  }
}

export default ResponseError;
