// src/product-package/entities/product-package.entity.ts
import { 
  Column, 
  Entity, 
  ManyToOne, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany 
} from "typeorm";
import { User } from "src/user/entities/user.entity";
import { PackagingRequest } from "src/packaging-request/entities/packaging-request.entity";
import { Packaging } from "src/packaging/entities/packaging.entity";

@Entity()
export class ProductPackage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item_name: string;

  @Column()
  category: string;

  @Column()
  quantity: number;

  @Column()
  details: string;

  @Column()
  destination: string;

  @Column({ default: false })
  verified: boolean;

  @ManyToOne(() => User, (user) => user.packages)
  owner: User;

  @Column({default: false})
  completed: boolean;

  @OneToOne(() => PackagingRequest, (packagingRequest) => packagingRequest.product)
  packagingRequest: PackagingRequest;

  @OneToMany(() => Packaging, (packaging) => packaging.item)
  packagings: Packaging[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}