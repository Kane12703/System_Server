import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth';
import { PostgresModule } from './configs';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { PermissionModule } from './module/permission/permission.module';
import { ProfileModule } from './module/profile/profile.module';

@Module({
  imports: [
    AuthModule,
    PostgresModule,
    UserModule,
    RoleModule,
    PermissionModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
