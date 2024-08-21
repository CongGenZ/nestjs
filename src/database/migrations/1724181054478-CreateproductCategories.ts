import { table } from "console";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateproductCategories1724181054478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'productCategories',
                columns:[
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
                        name: 'productId',
                        type: 'integer',
                    },
                    {
                        name: 'categoryId',
                        type: 'integer',
                    }
                ]
            })
        );
        // Create foreign key
        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                columnNames: ['productId','categoryId'],
                referencedTableName: 'productCategories', // Replace with actual table name if different
                referencedColumnNames: ['id'], // Replace with actual primary column name if different
                onDelete: 'CASCADE', // Optional: Specify how to handle deletes
                onUpdate: 'CASCADE', // Optional: Specify how to handle updates
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key first
        const table = await queryRunner.getTable('productCategories');
        const foreignKey1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('productId') !== -1);
        const foreignKey2 = table.foreignKeys.find(fk => fk.columnNames.indexOf('productId') !== -1);
        if (foreignKey1) {
            await queryRunner.dropForeignKey('productCategories', foreignKey1);
        }
        if (foreignKey2) {
            await queryRunner.dropForeignKey('productCategories', foreignKey2);
        }
//foreignKey2
        // Drop categories table
        await queryRunner.dropTable('productCategories');
    }

}
