import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrders1724092672372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'orders',
                columns:[
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'buyerName',
                        type: 'varchar',
                    },
                    {
                        name: 'buyerPhone',
                        type: 'varchar',
                    },
                    {
                        name: 'buyerEmail',
                        type: 'varchar',
                    },
                    {
                        name: 'buyerAddress',
                        type: 'varchar',
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
                        name: 'userId',
                        type: 'integer', // Corrected type
                    },
                ]
            })
        );
        // Create foreign key
        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedTableName: 'users', // Replace with actual table name if different
                referencedColumnNames: ['id'], // Replace with actual primary column name if different
                onDelete: 'CASCADE', // Optional: Specify how to handle deletes
                onUpdate: 'CASCADE', // Optional: Specify how to handle updates
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key first
        const table = await queryRunner.getTable('orders');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('orders', foreignKey);
        }

        // Drop categories table
        await queryRunner.dropTable('orders');
    }

}
