import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { UOperations } from "./UOperations";
import { URoles } from "./URoles";

@Entity("u_roles_operations")
export class URolesOperations {
  @Column("varchar", { primary: true, name: "roleId" })
  roleId: string;

  @Column("varchar", { primary: true, name: "operationId" })
  operationId: string;

  @Column("boolean", { name: "value", default: false })
  value: boolean;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;

  @ManyToOne(() => UOperations, (uOperations) => uOperations.uRolesOperations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "operationId" }])
  operation: UOperations;

  @ManyToOne(() => URoles, (uRoles) => uRoles.uRolesOperations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "roleId" }])
  role: URoles;
}
