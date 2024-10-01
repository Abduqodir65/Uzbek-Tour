import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use(morgan('tiny'))
  
  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(`Listening on ${configService.get<number>('appConfig.port')}`)
  });
}
bootstrap();
