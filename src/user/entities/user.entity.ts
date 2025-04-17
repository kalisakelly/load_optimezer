import { ProductPackage } from 'src/product-package/entities/product-package.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({nullable:true} )
  name: string;
  
  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({default:"12345678"})
  password: string;

  @Column({ default: 'client' }) 
  role: string;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.driver)
  drivers: Vehicle;

  @OneToOne(() => Stock, (stock) => stock.managed_by)
  stock:Stock

  @Column({ nullable: true })
  emailVerificationToken: string;

  
  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  passwordResetExpires: Date;

  @ManyToOne(()=>ProductPackage,(packages)=>packages.owner)
  packages: ProductPackage

  @CreateDateColumn()
  createdate: Date;

  @UpdateDateColumn()
  updatedate: Date;

  
}
