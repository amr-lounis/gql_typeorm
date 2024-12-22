import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { Users } from "./Users";
import { URolesOperations } from "./URolesOperations";

@Entity("u_roles")
export class URoles {
  @Column("varchar", { primary: true, name: "id" })
  id: string;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;

  @OneToMany(() => Users, (user) => user.role)
  users: Users[];

  @OneToMany(
    () => URolesOperations,
    (uRolesOperations) => uRolesOperations.role
  )
  uRolesOperations: URolesOperations[];
}
