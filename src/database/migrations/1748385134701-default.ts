import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1748385134701 implements MigrationInterface {
    name = 'Default1748385134701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "postagens" ("id" BIGSERIAL NOT NULL, "titulo" character varying(50) NOT NULL, "conteudo" text NOT NULL, "visivel" boolean NOT NULL DEFAULT true, "usuario_cadastrador" text, "usuario_atualizador" text, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), "foto_url" text, CONSTRAINT "UQ_2cdc702ffcbc18cb19002978f97" UNIQUE ("titulo"), CONSTRAINT "PK_384a39103a96cc834ce46949fc6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "postagens"`);
    }

}
