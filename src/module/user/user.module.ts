import { Module } from '@nestjs/common';

import { UserController } from './controllers';
import { UserService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEnity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEnity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
