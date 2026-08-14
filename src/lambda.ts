import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import type { RequestListener } from 'node:http';
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  APIGatewayProxyResultV2,
  Handler,
} from 'aws-lambda';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type ApiGatewayEvent = APIGatewayProxyEvent | APIGatewayProxyEventV2;
type ApiGatewayResult = APIGatewayProxyResult | APIGatewayProxyResultV2;
type ApiGatewayHandler = Handler<ApiGatewayEvent, ApiGatewayResult>;

let cachedServer: ApiGatewayHandler | undefined;

async function bootstrap(): Promise<ApiGatewayHandler> {
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

    // Configuramos Swagger
    const config = new DocumentBuilder()
      .setTitle('Monos Phoenix API')
      .setDescription('The API documentation for Monos Phoenix backend')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup('api/docs', nestApp, documentFactory);

    // 3. Inicializamos la aplicación de NestJS (sin usar .listen)
    await nestApp.init();

    // 4. Obtenemos la instancia subyacente de Express y la envolvemos
    const expressApp = nestApp.getHttpAdapter().getInstance() as RequestListener;
    cachedServer = serverlessExpress<ApiGatewayEvent, ApiGatewayResult>({ app: expressApp });
  }

  return cachedServer;
}

export const handler: ApiGatewayHandler = async (event, context) => {
  const server = await bootstrap();
  const result = await server(event, context, () => undefined);

  if (result === undefined) {
    console.log('mauri gay v2');
    throw new Error('Serverless Express returned no response.');
  }

  return result;
};
