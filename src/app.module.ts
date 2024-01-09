import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth';
import { PostgresModule } from './configs';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [AuthModule, PostgresModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
