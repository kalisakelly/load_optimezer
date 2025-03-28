// src/product-package/entities/product-package.entity.ts
import { 
  Column, 
  Entity, 
  ManyToOne, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany, 
  PrimaryColumn,
  BeforeInsert,
  JoinColumn
} from "typeorm";
import { User } from "src/user/entities/user.entity";
import { PackagingRequest } from "src/packaging-request/entities/packaging-request.entity";
import { Packaging } from "src/packaging/entities/packaging.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class ProductPackage {
  @PrimaryColumn() 
  id: string;

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

  @Column({default:false})
  delivered: boolean;

  @OneToOne(() => PackagingRequest, (packagingRequest) => packagingRequest.product)
  packagingRequest: PackagingRequest;

  @OneToMany(() => Packaging, (packaging) => packaging.item)
  packagings: Packaging[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  // @BeforeInsert() 
  // generateUuid() {
  //   if (!this.id) {
  //     this.id = uuidv4();
  //     console.log('Generated UUID:', this.id);
  //   }
  // }
}