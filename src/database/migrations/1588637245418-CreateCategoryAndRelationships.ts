import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCategoryAndRelationships1588637245418 implements MigrationInterface {
    name = 'CreateCategoryAndRelationships1588637245418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "category_id" uuid NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_c9e41213ca42d50132ed7ab2b0f" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_c9e41213ca42d50132ed7ab2b0f"`, undefined);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "category_id"`, undefined);
        await queryRunner.query(`DROP TABLE "categories"`, undefined);
    }

}
