import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserServiceModule } from './user-service.module';
import { RedisOptions } from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      host: '127.0.0.1',
      port: 6379,
    } as RedisOptions,
  };

  app.connectMicroservice(microserviceOptions);
  await app.startAllMicroservices();
  await app.listen(3003);
  Logger.log('service start in port ', 3003);
}
bootstrap();
