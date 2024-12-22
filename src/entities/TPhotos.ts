import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { Todos } from "./Todos";

@Entity("t_photos")
export class TPhotos {
  @Column("varchar", { primary: true, name: "todoId" })
  todoId: string;

  @Column("blob", { name: "photo" })
  photo: Buffer;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;

  @OneToOne(() => Todos, (todos) => todos.tPhotos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "todoId" }])
  todo: Todos;
}
