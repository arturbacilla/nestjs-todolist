import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { TaskService } from './task/task.service';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';

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
  providers: [
    providePrismaClientExceptionFilter({
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }),
    TaskService,
  ],
})
export class AppModule {}
