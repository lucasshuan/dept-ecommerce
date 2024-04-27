import { SignInDto, SignUpDto } from '@app/shared/lib/dto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('sign_in');
    this.authClient.subscribeToResponseOf('sign_up');
    await this.authClient.connect();
  }

  async signIn(signInDto: SignInDto) {
    return lastValueFrom(
      this.authClient.send('sign_in', JSON.stringify(signInDto)),
    );
  }

  async signUp(signUpDto: SignUpDto) {
    return lastValueFrom(
      this.authClient.send('sign_up', JSON.stringify(signUpDto)),
    );
  }
}
