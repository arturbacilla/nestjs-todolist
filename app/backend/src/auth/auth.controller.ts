import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import ResponseError from 'src/utils/error';
import DefaultResponse from 'src/utils/default';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const { email, password } = signInDto;
    if (!email || !email.length || !password || !password.length) {
      throw new ResponseError<Error>(Error('Invalid credentials'), 'FORBIDDEN');
    }
    return this.authService.signIn(email, password);
  }

  @Public()
  @Post('verify')
  async checkToken(@Body() body: any) {
    const { token } = body;
    if (!token) {
      throw new ResponseError<Error>(Error('Missing token'), 'BAD_REQUEST');
    }
    try {
      const verified = await this.authService.verifyToken(token);
      if (verified) return new DefaultResponse<boolean>(true, 'OK');
    } catch (error) {
      throw new ResponseError<Error>(error, 'FORBIDDEN');
    }
  }
}
