import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './datebase.seeding';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  app.useGlobalPipes(new ValidationPipe());
  const seedService = app.get(SeedService);
  await seedService.seedData();
  await app.listen(8080);
}
bootstrap();
