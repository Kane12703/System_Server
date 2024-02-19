import { Module } from '@nestjs/common';

import { UserController } from './controllers';
import { UserService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '@/auth';
import { TwoFactorAuthenticationService } from '@/auth/services/twoFactorAuthentication.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
