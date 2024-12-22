import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { Products } from "./Products";

@Entity("p_categories")
export class PCategories {
  @Column("varchar", { primary: true, name: "id" })
  id: string;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;

  @OneToMany(() => Products, (products) => products.categorie)
  products: Products[];
}
