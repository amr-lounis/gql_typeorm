import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity("settings")
export class Settings {
  @Column("varchar", { primary: true, name: "key" })
  key: string;

  @Column("varchar", { name: "value" })
  value: string;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;
}
