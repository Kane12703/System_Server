import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/module/user/entities/user.entity';
import { AuthRepository } from './repositories/auth.repository';
import { JWTService } from '@/configs/jwt';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JWTService,
    JwtService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
