import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { PrismaModule } from "nestjs-prisma";
import { AuthGuard } from "./auth/auth.guard";
import { AuthModule } from "./auth/auth.module";
import { TaskController } from "./task/task.controller";
import { TaskService } from "./task/task.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		PrismaModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
	],
	controllers: [TaskController],
	providers: [
		TaskService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
