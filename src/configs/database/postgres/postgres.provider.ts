import { Environments } from '@/configs/environments';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresProvider implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      host: Environments.POSTGRES_HOST,
      port: Environments.POSTGRES_PORT,
      username: Environments.POSTGRES_USER,
      password: Environments.POSTGRES_PASSWORD,
      database: Environments.POSTGRES_DB,
      type: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      // cache: true,
      connectTimeoutMS: 30000,
      verboseRetryLog: true,
      nativeDriver: true,
      // logging: true,
      subscribers: ['dist/**/*.subscriber{.ts,.js}'],
    };
  }
}
