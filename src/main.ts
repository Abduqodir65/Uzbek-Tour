import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.use(morgan('tiny'))
  
  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(`Listening on ${configService.get<number>('appConfig.port')}`)
  });
}
bootstrap();
