import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import ResponseError from "src/utils/error";
import type { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(email, pass) {
		const user = await this.usersService.findOne(email);
		if (!user) throw new ResponseError<Error>(Error("User not found"), "NOT_FOUND");
		const validPass = await bcrypt.compare(pass, user.password);
		if (!validPass) {
			throw new UnauthorizedException();
		}
		const payload = { id: user.id, email: user.email };
		return {
			userId: user.id,
			name: user.name,
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async verifyToken(token: string) {
		return await this.jwtService.verifyAsync(token);
	}
}
