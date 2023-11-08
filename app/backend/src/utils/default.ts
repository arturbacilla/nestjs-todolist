import { HttpStatus } from '@nestjs/common';

class DefaultResponse<T> {
  statusCode: number;
  type?: string;
  message: T | string;
  error: boolean;

  constructor(
    message: T | string,
    customCode: keyof typeof HttpStatus & string,
  ) {
    this.statusCode = HttpStatus[customCode];
    this.message = message;

    return {
      error: false,
      message: this.message,
      statusCode: this.statusCode,
      type: this.type,
    };
  }
}

export default DefaultResponse;
