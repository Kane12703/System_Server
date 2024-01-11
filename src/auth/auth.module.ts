import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/module/user/entities/user.entity';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
