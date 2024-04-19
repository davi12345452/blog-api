import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    // Validando se existe um usuário com o email informado
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    // Validando se a senha é válida para o usuário informado
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;
    // Caso email pertencer a um usuário e senha for correta, devolve o usuário
    return user;
  }
}
