import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Coffee } from "./entities/coffee.entity";

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 123,
      name: "Esspresso",
      brand: "New Bean",
      flavours: ["chocolate", "vanilla"]
    }
  ];

  public findAll() {
    return this.coffees;
  }

  public findOne(id: number) {
    const coffee = this.coffees.find((item) => item.id == id);
    if (!coffee) {
      // throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee ${id} not found`);
    }

    return coffee;
  }

  public create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  public update(id: number, body: object) {
    const existingCoffee = this.findOne(Number(id));
    if (existingCoffee) {
      // update
    }
  }

  public remove(id: number) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }

}
