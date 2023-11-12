import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/auth.decorator';
import ResponseError from 'src/utils/error';
import { Prisma } from '@prisma/client';
import DefaultResponse from 'src/utils/default';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('new')
  async createUser(@Body() body: any) {
    const { name, user, email, password } = body || {};
    if (!name || !user || !email || !password) {
      throw new ResponseError<Error>(Error('Invalid input'), 'BAD_REQUEST');
    }
    const added = await this.usersService.newUser(body);
    if (!added || added instanceof Prisma.PrismaClientKnownRequestError)
      throw new ResponseError<Prisma.PrismaClientKnownRequestError>(
        added as Prisma.PrismaClientKnownRequestError,
        'INTERNAL_SERVER_ERROR',
      );
    return new DefaultResponse<Prisma.UserCreateArgs['data']>(
      added as any,
      'CREATED',
    );
  }
}
