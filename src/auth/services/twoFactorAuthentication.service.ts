import { Environments } from '@/configs';
import { UserService } from '@/module/user/services';
import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(private readonly userService: UserService) {}

  async pipeQrCodeStream(stream: Response, otpAuthUrl: string) {
    return toFileStream(stream, otpAuthUrl);
  }

  async generateTwoFactorAuthenticationSecret() {
    const secret = await authenticator.generateSecret();
    return secret;
  }

  async sendOtp(secret: string) {
    return authenticator.generate(secret);
  }

  async isTwoFactorAuthenticationCodeValid(code: string, secret: string) {
    return authenticator.verify({ token: code, secret: secret });
  }
}
