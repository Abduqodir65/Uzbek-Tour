import { Module } from '@nestjs/common';
import { appConfig, dbConfig } from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { City } from './modules';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        dialect: "postgres",
        host: config.get('database.host'),
        port: +config.get('database.port'),
        username: config.get('database.user'),
        password: config.get('database.password'),
        database: config.get('database.dbName'),
        models: [City],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
  ],
})
export class AppModule {}
