import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import ResponseError from 'src/utils/error';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    const { email, password } = signInDto;
    if (!email || !email.length || !password || !password.length) {
      throw new ResponseError<Error>(Error('Invalid credentials'), 'FORBIDDEN');
    }
    return this.authService.signIn(email, password);
  }
}
