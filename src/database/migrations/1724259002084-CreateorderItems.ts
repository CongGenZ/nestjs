import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateorderItems1724259002084 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'orderItems',
                columns:[
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name:'orderId',
                        type:'integer'
                    },
                    {
                        name:'productId',
                        type:'integer'
                    }, 
                    {
                        name: 'quantity',
                        type: 'integer',
                        default: 0,
                      },
                      {
                        name: 'price',
                        type: 'integer',
                        default: 0,
                      },
                      {
                        name: 'discountId',
                        type: 'integer',
                      },
                    {
                        name:'discountType',
                        type:'discountType'
                    },
                    {
                        name:'discountMount',
                        type:'discountMount'
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
                
                ]
            })
        );
        // Create foreign key
        await queryRunner.createForeignKey(
            'discounts',
            new TableForeignKey({
                columnNames: ['orderId','productId','discountId'],
                referencedTableName: 'orderItems', // Replace with actual table name if different
                referencedColumnNames: ['id'], // Replace with actual primary column name if different
                onDelete: 'CASCADE', // Optional: Specify how to handle deletes
                onUpdate: 'CASCADE', // Optional: Specify how to handle updates
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
