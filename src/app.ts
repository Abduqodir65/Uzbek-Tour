import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, dbConfig, jwtConfig } from './config';
import { SequelizeModule } from '@nestjs/sequelize';
import { City, CityModule, Galery, GaleryModule, Routes, RoutesModule, User, UserModule } from './modules';
import { APP_FILTER,APP_GUARD } from '@nestjs/core';
import { CheckAuthGuard } from './guards';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from './modules/file';
import { AuthModule } from './modules/auth';
import { MailModule } from 'modules/mailer/mail.module';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig,jwtConfig],
    }),
    JwtModule.register({
      secret: 'my secret',
      global: true,
      signOptions: {
        expiresIn: 60 * 15
      }
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get('database.host'),
            port: config.get<number>('database.port'),
            username: config.get('database.user'),
            password: config.get('database.password'),
            database: config.get('database.dbName'),
            models: [City,Routes,Galery,User],
            synchronize: true,
            // sync: { force: true },
            logging: console.log,
            autoLoadModels: true,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN
    }),
    AuthModule,
    CityModule,
    RoutesModule,
    GaleryModule,
    UserModule,
    FileModule,
    MailModule
  ],
  providers: [{
    useClass: CheckAuthGuard,
    provide:APP_GUARD
  }]

})
export class AppModule {}

