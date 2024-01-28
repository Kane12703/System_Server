import { Environments } from '@/configs';
import { UserService } from '@/module/user/services';
import { Injectable } from '@nestjs/common';
import { authenticator, totp } from 'otplib';
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
    authenticator.options = { step: 30, digits: 6, window: 2 };
    return authenticator.generate(secret);
  }

  async isTwoFactorAuthenticationCodeValid(code: string, secret: string) {
    return authenticator.check(code, secret);
  }
}
