import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationModule } from './notification.module';
import { RedisOptions } from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      host: '127.0.0.1',
      port: 6379,
    } as RedisOptions,
  };

  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
  await app.listen(3002);
  Logger.log('service start in port ', 3002);
}
bootstrap();
