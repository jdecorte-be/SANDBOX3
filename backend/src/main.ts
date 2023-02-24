import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<any>('PORT');
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('app');
  app.use(cookieParser());
  app.use(
    session({
      cookie: {
        maxAge: Number(configService.get('JWT_EXPIRATION_TIME')),
      },
      secret: configService.get<any>('JWT_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('API Doc')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(PORT);
}
bootstrap();
