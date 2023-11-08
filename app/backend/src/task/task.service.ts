import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async addTask({
    title,
    description,
  }): Promise<
    Prisma.TaskCreateArgs['data'] | Prisma.PrismaClientKnownRequestError
  > {
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

  async getTasks(): Promise<
    Prisma.TaskCreateArgs['data'][] | Prisma.PrismaClientKnownRequestError
  > {
    try {
      return (await this.prisma.task.findMany()) || [];
    } catch (error) {
      return error;
    }
  }

  async getTask({
    id,
  }): Promise<
    Prisma.TaskCreateArgs['data'] | Prisma.PrismaClientKnownRequestError
  > {
    const where = { id: Number(id) };
    try {
      return (await this.prisma.task.findUnique({ where })) || null;
    } catch (error) {
      return error;
    }
  }

  async updateTask(
    id: number,
    payload: Prisma.TaskUpdateInput,
  ): Promise<
    Prisma.TaskCreateArgs['data'] | null | Prisma.PrismaClientKnownRequestError
  > {
    try {
      const exists = await this.prisma.task.findUnique({ where: { id } });
      if (!exists) return null;
      return await this.prisma.task.update({
        where: { id },
        data: payload,
      });
    } catch (error) {
      return error;
    }
  }

  async deleteTask({
    id,
  }): Promise<
    Prisma.TaskCreateArgs['data'] | null | Prisma.PrismaClientKnownRequestError
  > {
    const where = { id: Number(id) };
    try {
      const exists = await this.prisma.task.findUnique({ where });
      if (!exists) return null;
      return await this.prisma.task.delete({ where });
    } catch (error) {
      return error;
    }
  }
}
