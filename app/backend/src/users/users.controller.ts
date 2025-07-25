import { Body, Controller, Post } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Public } from "src/auth/auth.decorator";
import DefaultResponse from "src/utils/default";
import ResponseError from "src/utils/error";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Public()
	@Post("new")
	async createUser(@Body() body: any) {
		const { name, user, email, password } = body || {};
		if (!name || !user || !email || !password) {
			throw new ResponseError<Error>(Error("Invalid input"), "BAD_REQUEST");
		}
		const added = await this.usersService.newUser(body);
		if (!added || added instanceof Prisma.PrismaClientKnownRequestError)
			throw new ResponseError<Prisma.PrismaClientKnownRequestError>(
				added as Prisma.PrismaClientKnownRequestError,
				"INTERNAL_SERVER_ERROR",
			);
		return new DefaultResponse<Prisma.UserCreateArgs["data"]>(added as any, "CREATED");
	}
}
