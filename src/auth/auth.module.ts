import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/module/user/entities/user.entity';

import { JWTService } from '@/configs/jwt';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { UserModule } from '@/module/user/user.module';
import { UserService } from '@/module/user/services';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { RoleModule } from '@/module/role/role.module';
import { TwoFactorAuthenticationService } from './services/twoFactorAuthentication.service';
import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './consumers/email.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    MailerModule,
    RoleModule,
    BullModule.registerQueue({
      name: 'send-mail',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTService,
    JwtService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TwoFactorAuthenticationService,
    EmailConsumer,
  ],

  exports: [TwoFactorAuthenticationService],
})
export class AuthModule {}
