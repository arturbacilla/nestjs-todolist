import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async addTask({ title, description }) {
    const created = await this.prisma.task.create({
      data: {
        title,
        description,
      },
    });
    return created;
  }
}
