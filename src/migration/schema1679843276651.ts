import { MigrationInterface, QueryRunner } from "typeorm";

export class schema1679843276651 implements MigrationInterface {
    name = 'schema1679843276651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "origin"`);
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "origins"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "origins" character varying`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "origin" character varying`);
    }

}
