import { MigrationInterface, QueryRunner } from "typeorm";

export class schemabase1680442572254 implements MigrationInterface {
    name = 'schemabase1680442572254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "flavour" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ad41d76f211fe58a8f4343db332" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coffee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "brand" character varying NOT NULL, "recommendations" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_4d27239ee0b99a491ad806aec46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coffee_flavours_flavour" ("coffeeId" integer NOT NULL, "flavourId" integer NOT NULL, CONSTRAINT "PK_f8cef0c1012432580e39b2e3cb5" PRIMARY KEY ("coffeeId", "flavourId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6f8fd8d565a5aedb52afcb11e2" ON "coffee_flavours_flavour" ("coffeeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cdbf92f3bdedba94f0db3999f2" ON "coffee_flavours_flavour" ("flavourId") `);
        await queryRunner.query(`ALTER TABLE "coffee_flavours_flavour" ADD CONSTRAINT "FK_6f8fd8d565a5aedb52afcb11e27" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "coffee_flavours_flavour" ADD CONSTRAINT "FK_cdbf92f3bdedba94f0db3999f2e" FOREIGN KEY ("flavourId") REFERENCES "flavour"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee_flavours_flavour" DROP CONSTRAINT "FK_cdbf92f3bdedba94f0db3999f2e"`);
        await queryRunner.query(`ALTER TABLE "coffee_flavours_flavour" DROP CONSTRAINT "FK_6f8fd8d565a5aedb52afcb11e27"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cdbf92f3bdedba94f0db3999f2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f8fd8d565a5aedb52afcb11e2"`);
        await queryRunner.query(`DROP TABLE "coffee_flavours_flavour"`);
        await queryRunner.query(`DROP TABLE "coffee"`);
        await queryRunner.query(`DROP TABLE "flavour"`);
    }

}
