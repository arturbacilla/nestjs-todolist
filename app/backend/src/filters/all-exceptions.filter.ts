import { Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import ResponseError from 'src/utils/error';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception, host) {
    try {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      response.status(exception.statusCode || 500).json(exception.response);
    } catch (error) {
      throw new ResponseError(error, 'INTERNAL_SERVER_ERROR');
    }
  }
}
