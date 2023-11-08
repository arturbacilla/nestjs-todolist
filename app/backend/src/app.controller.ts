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
        allTasks,
        'INTERNAL_SERVER_ERROR',
      );
    }
    return new DefaultResponse<Prisma.TaskCreateArgs['data']>(allTasks, 'OK');
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
        added,
        'INTERNAL_SERVER_ERROR',
      );
    }
    return new DefaultResponse<Prisma.TaskCreateArgs['data']>(added, 'OK');
  }

  @Delete('task/:id')
  async deleteTask(@Param('id') id: number) {
    // todo: adicionar método para ver o erro de notfound
    const deleted = await this.taskService.deleteTask({
      id,
    });
    if (!deleted || deleted instanceof Prisma.PrismaClientKnownRequestError) {
      return new ResponseError<Prisma.PrismaClientKnownRequestError>(
        deleted,
        'INTERNAL_SERVER_ERROR',
      );
    }

    return new DefaultResponse<Prisma.TaskCreateArgs['data']>(deleted, 'OK');
  }
}
