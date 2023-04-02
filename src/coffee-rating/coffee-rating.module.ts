import { Module } from "@nestjs/common";
import { CoffeeRatingService } from "./coffee-rating.service";
import { CoffeesModule } from "../coffees/coffees.module";
import { DatabaseModule } from "../database/database.module";

@Module({
  providers: [CoffeeRatingService],
  imports: [CoffeesModule, DatabaseModule.register({
    type: "postgres",
    host: "localhost",
    port: 5432,
  })]
})
export class CoffeeRatingModule {
}
