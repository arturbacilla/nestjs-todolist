import { StatusCodes } from 'http-status-codes';

class DefaultResponse<T> {
  code: number;
  type?: string;
  message: T | string;
  error: boolean;

  constructor(
    message: T | string,
    statusCode: keyof typeof StatusCodes & string,
  ) {
    this.code = StatusCodes[statusCode];
    this.message = message;

    return {
      error: false,
      message: this.message,
      code: this.code,
      type: this.type,
    };
  }
}

export default DefaultResponse;
