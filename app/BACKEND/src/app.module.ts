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
import { GatewayModule } from './gateway/gateway.module';
import { ChatsModule } from './chats/chats.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [`stage.${process.env.STAGE}.env`],
          validationSchema: configValidationSchema,
        }),
        UsersModule,
        AuthenticationModule,
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
    GatewayModule,
    ChatsModule,
  ],
  controllers: [AppController, DbfilesController],
  providers: [AppService],
})
export class AppModule {}
