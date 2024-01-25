import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { ProfileRepository } from './repositories/profile.repository';
import { AuthModule } from '@/auth';
import { UserModule } from '../user/user.module';
import { CloudinaryModule } from '@/configs/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity]),
    UserModule,
    CloudinaryModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
})
export class ProfileModule {}
