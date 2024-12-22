import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Products } from "./Products";
import { Invoices } from "./Invoices";

@Entity("i_products")
export class IProducts {
  @Column("varchar", { primary: true, name: "invoiceId" })
  invoiceId: string;

  @Column("varchar", { primary: true, name: "productId" })
  productId: string;

  @Column("varchar", { name: "description", default: "" })
  description: string;

  @Column("real", { name: "quantity", default: 0 })
  quantity: number;

  @Column("real", { name: "money_unite", default: 0 })
  money_unite: number;

  @Column("real", { name: "money_calc", default: 0 })
  money_calc: number;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;

  @ManyToOne(() => Products, (products) => products.iProducts, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "productId" }])
  product: Products;

  @ManyToOne(() => Invoices, (invoices) => invoices.iProducts, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "invoiceId" }])
  invoice: Invoices;
}
