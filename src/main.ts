import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const logger = new Logger('Main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port
      }
    }
  
  );
  app.useGlobalPipes( 

    //Validaciones
    new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true, 
    }) 
   );
  //Microservcios
  await app.listen();
  // await app.listen( envs.port);

  //Esto haría que nuestra app fuera híbrida entre RestFullApi y Microservicios
  // await app.startAllMicroservices();

  logger.log(`Products Microservice running on port ${ envs.port} `);
}
bootstrap();
