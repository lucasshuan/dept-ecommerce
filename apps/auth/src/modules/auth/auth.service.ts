import { SignInDto, SignUpDto } from '@app/shared/lib/dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(credentials: SignInDto) {
    const user = await this.userService.findByEmail(credentials.email);
    if (!user) {
      throw new UnauthorizedException("Email or password doesn't match");
    }
    const passwordMatches = await bcrypt.compare(
      credentials.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException("Email or password doesn't match");
    }
    return user;
  }

  async signUp(credentials: SignUpDto) {
    if (credentials.password.length < 8) {
      throw new BadRequestException('Password too short');
    }
    const passwordHash = await bcrypt.hash(credentials.password, 10);
    const newUser = await this.userService.create({
      username: credentials.username,
      email: credentials.email,
      passwordHash,
    });
    return this.userService.create(newUser);
  }
}
