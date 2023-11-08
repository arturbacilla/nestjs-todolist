import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

class ResponseError<T> extends Error {
  statusCode: number;
  type?: string;
  error: boolean;
  name: string;

  constructor(error: T | Error, customCode: keyof typeof HttpStatus & string) {
    super();

    this.statusCode = HttpStatus[customCode];
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
      statusCode: this.statusCode,
      type: this.type,
    };
  }
}

export default ResponseError;
