import { Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import ResponseError from 'src/utils/error';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception, host) {
    const code = exception.response
      ? exception.response.statusCode
      : exception.statusCode;
    try {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const json = exception.response ? exception.response : exception;
      response.status(code || 500).json(json);
    } catch (error) {
      throw new ResponseError(error, code);
    }
  }
}
