import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UsePipes, ValidationPipe
} from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { Public } from "../common/decorators/public.decorator";
import { Protocol } from "../common/decorators/protocol.decorator";

@UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Public()
  @Get()
  findAll(
    @Protocol() protocol: string,
    @Query() paginationQuery: PaginationQueryDto
  ) {
    console.log(protocol);
    return this.coffeeService.findAll(paginationQuery);
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
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  removeCoffee(@Param('id') id: string) {
    this.coffeeService.remove(id);
    return `Coffee ID #${id} has been removed`;
  }
}
