import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Handler, Context } from 'aws-lambda';
import 'pg';

let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);

    // 1. Aplicamos tus Pipes globales tal como en main.ts
    nestApp.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    // 2. Habilitamos CORS
    nestApp.enableCors();

    // 3. Inicializamos la aplicación de NestJS (sin usar .listen)
    await nestApp.init();

    // 4. Obtenemos la instancia subyacente de Express y la envolvemos
    const expressApp = nestApp.getHttpAdapter().getInstance();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  const server = await bootstrap();
   return (server as (event: any, context: Context) => Promise<any>)(event, context);
};