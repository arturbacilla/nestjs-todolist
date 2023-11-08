import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async addTask({ title, description }) {
    try {
      const created = await this.prisma.task.create({
        data: {
          title,
          description: description || null,
        },
      });
      return created;
    } catch (error) {
      return error;
    }
  }

  async getTasks() {
    try {
      return await this.prisma.task.findMany();
    } catch (error) {
      return error;
    }
  }

  async deleteTask({ id }) {
    try {
      return await this.prisma.task.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      return error;
    }
  }
}
