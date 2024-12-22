import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { URolesOperations } from "./URolesOperations";

@Entity("u_operations")
export class UOperations {
  @Column("varchar", { primary: true, name: "id" })
  id: string;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;

  @OneToMany(
    () => URolesOperations,
    (uRolesOperations) => uRolesOperations.operation
  )
  uRolesOperations: URolesOperations[];
}
