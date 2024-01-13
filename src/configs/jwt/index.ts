import { Injectable } from '@nestjs/common';
import { Environments } from '../environments';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: Environments.ACCESS_TOKEN_SECRET,
          expiresIn: Environments.ACCESS_TOKEN_EXPIRATION_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: Environments.REFRESH_TOKEN_SECRET,
          expiresIn: Environments.REFRESH_TOKEN_EXPIRATION_TIME,
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
