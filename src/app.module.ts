import { Module } from "@nestjs/common";
import * as Joi from "@hapi/joi";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeesModule } from "./coffees/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeeRatingModule } from "./coffee-rating/coffee-rating.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./config/app.config";


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        useFactory: () => ({
          type: "postgres",
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          autoLoadEntities: true,
          synchronize: true
        })
      }
    ),
    CoffeesModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432)
      }),
      load: [appConfig]
    }),
    CoffeeRatingModule,
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
