import { Body, Controller, Post } from '@nestjs/common';
import { TaskService } from './task/task.service';

@Controller()
export class AppController {
  constructor(private taskService: TaskService) {}

  @Post('task')
  async addTask(@Body() body: any) {
    const { title, description } = body || {};
    const added = await this.taskService.addTask({
      title,
      description: description || undefined,
    });
    console.log(added);
  }
}
