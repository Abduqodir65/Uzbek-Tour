import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, dbConfig } from './config';
import { SequelizeModule } from '@nestjs/sequelize';
import { City, CityModule, Galery, GaleryModule, Routes, RoutesModule, User, UserModule } from './modules';
import { ExceptionHandlerFilter } from './filters';
import { APP_FILTER,APP_GUARD } from '@nestjs/core';
import { CheckAuthGuard } from './guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
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
    CityModule,
    RoutesModule,
    GaleryModule,
    UserModule
  ],
  providers: [{
    useClass: CheckAuthGuard,
    provide:APP_GUARD
  }]

})
export class AppModule {}

