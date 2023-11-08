import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { TaskService } from './task/task.service';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      envFilePath: './.env',
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [TaskService],
})
export class AppModule {}
