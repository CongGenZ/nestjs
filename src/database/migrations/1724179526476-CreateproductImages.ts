import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateproductImages1724179526476 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'productImages',
                columns:[
                    {
                        name:'id',
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
                    name:'imageUrl',
                    type:'varchar'
                   },
                   {
                    name:'productId',
                    type:'integer'
                   },         
                ]
            })
        );

        //Create foreign key
        await queryRunner.createForeignKey(
            'productImages',
            new TableForeignKey({
                columnNames:['productId'],
                referencedTableName:'productImages',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE', // Optional: Specify how to handle deletes
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        // Drop foreign key first
        const table = await queryRunner.getTable('productImages');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('productId') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('productImages', foreignKey);
        }

        // Drop categories table
        await queryRunner.dropTable('productImages');
    }

}
