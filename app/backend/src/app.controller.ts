import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task/task.service';
import { Prisma } from '@prisma/client';
import DefaultResponse from './utils/default';
import ResponseError from './utils/error';

@Controller()
export class AppController {
  constructor(private taskService: TaskService) {}

  @Get('tasks')
  async getTasks() {
    const allTasks = await this.taskService.getTasks();
    if (!allTasks || allTasks instanceof Prisma.PrismaClientKnownRequestError) {
      return new ResponseError<Prisma.PrismaClientKnownRequestError>(
        allTasks as Prisma.PrismaClientKnownRequestError,
        'INTERNAL_SERVER_ERROR',
      );
    }
    return new DefaultResponse<Prisma.TaskCreateArgs['data']>(
      allTasks as any,
      'OK',
    );
  }

  @Get('task/:id')
  async getTask(@Param('id') id: number) {
    const task = await this.taskService.getTask({ id });
    if (!task)
      return new ResponseError<Error>(Error('Task not found'), 'NOT_FOUND');
    if (task instanceof Prisma.PrismaClientKnownRequestError) {
      return new ResponseError<Prisma.PrismaClientKnownRequestError>(
        task as Prisma.PrismaClientKnownRequestError,
        'INTERNAL_SERVER_ERROR',
      );
    }
    return new DefaultResponse<Prisma.TaskCreateArgs['data']>(
      task as Prisma.TaskCreateArgs['data'],
      'OK',
    );
  }

  @Post('task')
  async addTask(@Body() body: any) {
    const { title, description } = body || {};
    const added = await this.taskService.addTask({
      title,
      description: description || undefined,
    });
    if (!added || added instanceof Prisma.PrismaClientKnownRequestError) {
      return new ResponseError<Prisma.PrismaClientKnownRequestError>(
        added as Prisma.PrismaClientKnownRequestError,
        'INTERNAL_SERVER_ERROR',
      );
    }
    return new DefaultResponse<Prisma.TaskCreateArgs['data']>(added, 'OK');
  }

  @Delete('task/:id')
  async deleteTask(@Param('id') id: number) {
    const deleted = await this.taskService.deleteTask({
      id,
    });
    if (!deleted) {
      return new ResponseError<Error>(Error('Task not found'), 'NOT_FOUND');
    }
    if (deleted instanceof Prisma.PrismaClientKnownRequestError) {
      return new ResponseError<Prisma.PrismaClientKnownRequestError>(
        deleted,
        'INTERNAL_SERVER_ERROR',
      );
    }

    return new DefaultResponse<Prisma.TaskCreateArgs['data']>(
      `Deleted task ${deleted.id}`,
      'OK',
    );
  }
}
