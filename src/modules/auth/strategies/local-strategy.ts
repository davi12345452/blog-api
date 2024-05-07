import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UnauthorizedRequestSwagger } from 'src/swagger/helpers/UnauthorizedRequestError';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      const messageError = new UnauthorizedRequestSwagger(
        'Authentication failed',
        'Check the email or password',
        'AUTH-ERROR-01',
        '{API-DOMAIN}/auth/login',
      );
      throw new UnauthorizedException(messageError);
    }

    return user;
  }
}
