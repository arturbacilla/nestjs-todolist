import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcryptjs';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async newUser({ name, user, email, password }) {
    try {
      return await this.prisma.user.create({
        data: {
          name,
          user,
          email,
          password: bcrypt.hashSync(password, 10),
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    const where = { email };
    try {
      return (await this.prisma.user.findUnique({ where })) || null;
    } catch (error) {
      return error;
    }
  }
}
