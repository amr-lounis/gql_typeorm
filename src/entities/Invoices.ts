import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { Users } from "./Users";
import { IProducts } from "./IProducts";

@Entity("invoices")
export class Invoices {
  @Column("varchar", { primary: true, name: "id" })
  id: string;

  @Column("varchar", { name: "employeeId", nullable: true })
  employeeId: string;

  @Column("varchar", { name: "dealerId", nullable: true })
  dealerId: string;

  @Column("boolean", { name: "validation", default: false })
  validation: boolean;

  @Column("varchar", { name: "type", default: "" })
  type: string;

  @Column("varchar", { name: "description", default: "" })
  description: string;

  @Column("real", { name: "money_net", default: 0 })
  money_net: number;

  @Column("real", { name: "money_tax", default: 0 })
  money_tax: number;

  @Column("real", { name: "money_stamp", default: 0 })
  money_stamp: number;

  @Column("real", { name: "money_calc", default: 0 })
  money_calc: number;

  @Column("real", { name: "money_paid", default: 0 })
  money_paid: number;

  @Column("real", { name: "money_unpaid", default: 0 })
  money_unpaid: number;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.invoices, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "dealerId" }])
  dealer: Users;

  @ManyToOne(() => Users, (users) => users.invoices2, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "employeeId" }])
  employee: Users;

  @OneToMany(() => IProducts, (iProducts) => iProducts.invoice)
  iProducts: IProducts[];
}
