import { MigrationInterface, QueryRunner } from "typeorm";

export class coffeeRecfacot1679841804426 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD COLUMN "origins" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" DROP COLUMN "origins" character varying`
    );
  }

}
