import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatecategoryDiscounts1724262616145 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'categoryDiscounts',
              columns: [
                {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updatedAt',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'discountId',
                  type: 'integer',
                },
                {
                  name: 'categoryId',
                  type: 'integer',
                },
              ],
            }),
          );
          await queryRunner.createForeignKey(
              'productDiscounts',
              new TableForeignKey({
                columnNames: ['discountId','categoryId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categoryDiscounts',
                onDelete: 'CASCADE',
              }),
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categoryDiscounts')
    }

}
