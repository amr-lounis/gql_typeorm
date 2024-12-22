import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from "typeorm";
import { URoles } from "./URoles";
import { UPhotos } from "./UPhotos";
import { Todos } from "./Todos";
import { Invoices } from "./Invoices";

@Entity("users")
export class Users {
  @Column("varchar", { primary: true, name: "id" })
  id: string;

  @Column({ name: "roleId", nullable: true })
  roleId: string;

  @Column("varchar", { name: "password", default: "" })
  password: string;

  @Column("varchar", { name: "description", default: "" })
  description: string;

  @Column("varchar", { name: "address", default: "" })
  address: string;

  @Column("varchar", { name: "first_name", default: "" })
  first_name: string;

  @Column("varchar", { name: "last_name", default: "" })
  last_name: string;

  @Column("varchar", { name: "phone", default: "" })
  phone: string;

  @Column("varchar", { name: "fax", default: "" })
  fax: string;

  @Column("varchar", { name: "email", default: "" })
  email: string;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;
  // 
  @ManyToOne(() => URoles, (uRoles) => uRoles.users, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "roleId" })
  role: URoles;

  @OneToOne(() => UPhotos, (uPhotos) => uPhotos.user)
  uPhotos: UPhotos;

  @OneToMany(() => Todos, (todos) => todos.dealer)
  todos: Todos[];

  @OneToMany(() => Todos, (todos) => todos.employee)
  todos2: Todos[];

  @OneToMany(() => Invoices, (invoices) => invoices.dealer)
  invoices: Invoices[];

  @OneToMany(() => Invoices, (invoices) => invoices.employee)
  invoices2: Invoices[];
}
