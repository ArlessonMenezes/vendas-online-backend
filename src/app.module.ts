import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION,
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '**/*entity/{.ts,.js}'], 
      autoLoadEntities: true,
      synchronize: true,
    } as TypeOrmModuleOptions),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
