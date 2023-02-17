import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from './app.schemas';
import { AuthenticationModule } from './authentication/authentication.module';
import { DbfilesController } from './dbfiles/dbfiles.controller';
import { DbfilesModule } from './dbfiles/dbfiles.module';
import { GameGateway} from "./game/game.gateway";
import {JwtService} from "@nestjs/jwt";
import {AuthenticationService} from "./authentication/authentication.service";
import {UsersService} from "./users/users.service";
import {JwtStrategy} from "./authentication/jwt.strategy";
import { GameModule} from "./game/game.module";


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [`stage.${process.env.STAGE}.env`],
          validationSchema: configValidationSchema,
        }),
        UsersModule,
        AuthenticationModule,
        GameModule,

      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    DbfilesModule,
  ],
  controllers: [AppController, DbfilesController],
  providers: [AppService]
})
export class AppModule {}
