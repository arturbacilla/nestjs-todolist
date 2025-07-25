import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();

	await app.listen(process.env.VITE_BACKEND_PORT || 3001);
}
bootstrap();
