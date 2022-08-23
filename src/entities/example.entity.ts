import { Entity, Column } from "typeorm";
import { VendureEntity, DeepPartial } from "@vendure/core";

/**
 * Here we define a new database entity. Passing this in to the plugin's `entities` array
 * will instruct TypeORM to create the new database table and make the entity available
 * to query in your plugin code.
 */
@Entity()
export class ExampleEntity extends VendureEntity {
  constructor(input?: DeepPartial<ExampleEntity>) {
    super(input);
  }

  @Column()
  name: string;
  //   define a new column in the database table, and make it available to query in your plugin code. name: precio_dolar type float
  // @Column("decimal", { precision: 5, scale: 2, nullable: true })
  // para poder usar esto , debe poner ? en las definiciones de graphql

  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  precio_dolar: number;
}
