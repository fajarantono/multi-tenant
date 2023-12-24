import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RedisOptions } from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      host: '127.0.0.1',
      port: 6379,
    } as RedisOptions,
  };

  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
  await app.listen(3000);
  Logger.log('service start in port ', 3000);
}

bootstrap();
