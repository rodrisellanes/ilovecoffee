import { DataSource } from "typeorm";
import { Coffee } from "./src/coffees/entities/coffee.entity";
import { Flavour } from "./src/coffees/entities/flavour.entity";
import { schema1679843276651 } from "./src/migration/schema1679843276651";


export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavour],
  migrations: [schema1679843276651],
});