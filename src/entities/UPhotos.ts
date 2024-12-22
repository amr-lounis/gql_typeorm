import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { Users } from "./Users";

@Entity("u_photos")
export class UPhotos {
  @Column("varchar", { primary: true, name: "userId" })
  userId: string;

  @Column("varchar", { name: "photo" })
  photo: Buffer | null;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;

  @OneToOne(() => Users, (users) => users.uPhotos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId" }])
  user: Users;
}
