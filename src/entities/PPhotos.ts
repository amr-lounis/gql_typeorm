import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { Products } from "./Products";

@Entity("p_photos")
export class PPhotos {
  @Column("varchar", { primary: true, name: "productId" })
  productId: string;

  @Column("blob", { name: "photo" })
  photo: Buffer;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;

  @OneToOne(() => Products, (products) => products.pPhotos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "productId" }])
  product: Products;
}
