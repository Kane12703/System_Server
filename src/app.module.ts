import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { Environments, PostgresModule } from './configs';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { PermissionModule } from './module/permission/permission.module';
import { ProfileModule } from './module/profile/profile.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    PostgresModule,
    UserModule,
    RoleModule,
    PermissionModule,
    ProfileModule,
    MailerModule.forRoot({
      transport: {
        host: Environments.MAIL_HOST,
        secure: false,
        auth: {
          user: Environments.MAIL_USER,
          pass: Environments.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"No Reply" <${Environments.MAIL_FROM}>`,
      },
      template: {
        dir: join(__dirname, 'src/configs/mail/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
