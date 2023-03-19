import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto/update-coffee.dto";

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    return this.coffeeService.findAll();
  }

  @Get(':id')
  findOne(@Param() params) {
    return this.coffeeService.findOne(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  updateCoffeeById(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  removeCoffee(@Param('id') id: string) {
    this.coffeeService.remove(id);
    return `Coffee ID #${id} has been removed`;
  }
}
