import { Injectable, NotFoundException } from "@nestjs/common";
import { Coffee } from "./entities/coffee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateCoffeeDto } from "./dto/create-coffee.dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto/update-coffee.dto";
import { Flavour } from "./entities/flavour.entity";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { Event} from "../events/entities/event.entity";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavour)
    private readonly flavorRepository: Repository<Flavour>,
    private readonly dataSource: DataSource,
  ) {
  }

  public findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: {
        flavours: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: {
        id: +id
      },
      relations: {
        flavours: true
      }
    });
    if (!coffee) {
      // throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee ${id} not found`);
    }

    return coffee;
  }

  public async create(createCoffeeDto: CreateCoffeeDto) {
    const flavours = await Promise.all(
      createCoffeeDto.flavours.map((name) => this.preloadFlavorByName(name))
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavours
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavours = await Promise.all(
      updateCoffeeDto.flavours.map((name) => this.preloadFlavorByName(name))
    );

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavours
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavour> {
    const existingFlavor = await this.flavorRepository.findOne({ where: { name } }); // 👈 notice the "where"
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }

  /* CoffeesService - recommendCoffee() addition */
  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
