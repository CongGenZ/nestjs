import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Creatediscounts1724257341102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
             new Table({
                name:'discounts',
                columns:[
                    {
                        name:'id',
                        type:'integer',
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
                        name:'name',
                        type:'varchar',
                    },
                    {
                        name:'discountType',
                        type:'discountType',
                    },
                    {
                        name:'discountAmount',
                        type:'discountAmount',
                    },
                    {
                        name:'expiredAt',
                        type:'datatime',
                    },
                    {
                        name:'startAt',
                        type:'datatime',
                    },
                    {
                        name:'status',
                        type:'discountStatus'
                    },
                    {
                        name:'adminId',
                        type:'integer'
                    },


                    
                ]
             })
        );

        // Create foreign key
        await queryRunner.createForeignKey(
            'discounts',
            new TableForeignKey({
                columnNames: ['adminId'],
                referencedTableName: 'discounts', // Replace with actual table name if different
                referencedColumnNames: ['id'], // Replace with actual primary column name if different
                onDelete: 'CASCADE', // Optional: Specify how to handle deletes
                onUpdate: 'CASCADE', // Optional: Specify how to handle updates
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key first
        const table = await queryRunner.getTable('discounts');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('adminId') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('discounts   ', foreignKey);
        }

        // Drop categories table
        await queryRunner.dropTable('discounts');
    }

}
