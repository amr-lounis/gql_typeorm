import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from "typeorm";
import { PUnits } from "./PUnits";
import { PCategories } from "./PCategories";
import { PPhotos } from "./PPhotos";
import { IProducts } from "./IProducts";

@Entity("products")
export class Products {
  @Column("varchar", { primary: true, name: "id" })
  id: string;

  @Column({ name: "categorieId", nullable: true })
  categorieId: string;

  @Column({ name: "unityId", nullable: true })
  unityId: string;

  @Column("varchar", { name: "code" })
  code: string;

  @Column("varchar", { name: "description", default: "" })
  description: string;

  @Column("real", { name: "money_purchase", default: 0 })
  money_purchase: number;

  @Column("real", { name: "money_selling", default: 0 })
  money_selling: number;

  @Column("real", { name: "money_selling_gr", default: 0 })
  money_selling_gr: number;

  @Column("real", { name: "quantity", default: 0 })
  quantity: number;

  @Column("real", { name: "quantity_alert", nullable: true })
  quantity_alert: number | null;

  @Column("datetime", { name: "date_alert", nullable: true })
  date_alert: Date | null;

  @CreateDateColumn({ type: 'datetime' })
  insertedAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date | null;

  @ManyToOne(() => PUnits, (pUnits) => pUnits.products, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "unityId" }])
  unity: PUnits;

  @ManyToOne(() => PCategories, (pCategories) => pCategories.products, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "categorieId" }])
  categorie: PCategories;

  @OneToOne(() => PPhotos, (pPhotos) => pPhotos.product)
  pPhotos: PPhotos;

  @OneToMany(() => IProducts, (iProducts) => iProducts.product)
  iProducts: IProducts[];
}
