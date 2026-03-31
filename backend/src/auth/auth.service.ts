import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(username: string, pass: string) {
    const admin = await this.prisma.client.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    // PHP uses $2y$ prefix, bcryptjs uses $2b$. We replace for compatibility.
    const normalizedHash = admin.password.replace(/^\$2y\$/, '$2b$');
    const isPasswordValid = await bcrypt.compare(pass, normalizedHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    const payload = { sub: admin.id, username: admin.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      }
    };
  }
}
