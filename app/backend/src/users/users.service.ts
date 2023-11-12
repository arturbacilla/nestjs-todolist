import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

// todo: alterar para achar os usuários via prisma (parecido com task)
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
