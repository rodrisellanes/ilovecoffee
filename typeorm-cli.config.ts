import { DataSource } from "typeorm";
import { schemabase1680442572254 } from "./src/migrations/schemabase1680442572254";


export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [],
  migrations: [schemabase1680442572254],
});