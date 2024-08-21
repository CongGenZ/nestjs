import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateproductDiscounts1724262584482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'productDiscounts',
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
            name: 'productId',
            type: 'integer',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
        'productDiscounts',
        new TableForeignKey({
          columnNames: ['discountId','productId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'productDiscounts',
          onDelete: 'CASCADE',
        }),
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('productDiscounts');
  }
}
