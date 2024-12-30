import { Stock } from 'src/stock/entities/stock.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.driver)
  drivers: Vehicle;

  @OneToOne(() => Stock, (stock) => stock.managed_by)
  stock:Stock

  
}
