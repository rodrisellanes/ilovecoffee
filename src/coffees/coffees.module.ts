import { Module } from "@nestjs/common";
import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coffee } from "./entities/coffee.entity";
import { Flavour } from "./entities/flavour.entity";
import { Event } from "../events/entities/event.entity";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { COFFEE_BRANDS } from "./coffees.constants";

class MockCoffeesService {
  public findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    console.log(`Params: ${limit}, ${offset}`);
    return ["tomato", "apple", "pineapple"];
  }
}

class ConfigService {
}

class DevelopmentConfigService {
}

class ProductionConfigService {
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavour, Event])],
  controllers: [CoffeesController],
  // providers: [{ provide: CoffeesService, useClass: MockCoffeesService }],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useValue: ["buddy bean", "roasted nut"]
    },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === "development"
          ? DevelopmentConfigService
          : ProductionConfigService
    }],
  exports: [CoffeesService]
})
export class CoffeesModule {
}
