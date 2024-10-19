import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config();
  console.log("Port", process.env.PORT);
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: ["https://ecommerce-client-opal.vercel.app"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
