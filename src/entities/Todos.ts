import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, UpdateDateColumn } from "typeorm";
import { Users } from "./Users";
import { TPhotos } from "./TPhotos";

@Entity("todos")
export class Todos {
  @Column("varchar", { primary: true, name: "id" })
  id: string;

  @Column({ name: "employeeId", nullable: true })
  employeeId: string;

  @Column({ name: "dealerId", nullable: true })
  dealerId: string;

  @Column("boolean", { name: "validation", default: false })
  validation: boolean;

  @Column("varchar", { name: "description", default: "" })
  description: string;

  @Column("real", { name: "money_total", default: 0 })
  money_total: number;

  @Column("real", { name: "money_paid", default: 0 })
  money_paid: number;

  @Column("real", { name: "money_unpaid", default: 0 })
  money_unpaid: number;

  @Column("real", { name: "money_expenses", default: 0 })
  money_expenses: number;

  @Column("real", { name: "money_margin", default: 0 })
  money_margin: number;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.todos, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "dealerId" }])
  dealer: Users;

  @ManyToOne(() => Users, (users) => users.todos2, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "employeeId" }])
  employee: Users;

  @OneToOne(() => TPhotos, (tPhotos) => tPhotos.todo)
  tPhotos: TPhotos;
}
