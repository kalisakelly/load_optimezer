import { Stock } from 'src/stock/entities/stock.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column()
  password: string;

  @Column({ default: 'user' }) 
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

   @CreateDateColumn()
    createdate: Date;

    @UpdateDateColumn()
    updatedate: Date;

  
}
