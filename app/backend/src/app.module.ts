import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { PrismaService } from './database/prisma.service';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService, TaskService],
})
export class AppModule {}
