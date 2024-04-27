import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignInDto, SignUpDto } from '@app/shared/lib/dto';
import { AuthService } from 'apps/api/src/modules/auth/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('sign_in')
  async signIn(@Payload(ValidationPipe) data: SignInDto) {
    return this.authService.signIn(data);
  }

  @MessagePattern('sign_up')
  async signUp(@Payload(ValidationPipe) data: SignUpDto) {
    return this.authService.signUp(data);
  }
}
