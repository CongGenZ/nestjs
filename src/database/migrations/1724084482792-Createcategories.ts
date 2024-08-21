import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCategories1724084482792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create categories table
        await queryRunner.createTable(
            new Table({
                name: 'categories',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
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
                ],
            }),
        );

        // Create foreign key
        await queryRunner.createForeignKey(
            'categories',
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
        const table = await queryRunner.getTable('categories');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('categories', foreignKey);
        }

        // Drop categories table
        await queryRunner.dropTable('categories');
    }
}
