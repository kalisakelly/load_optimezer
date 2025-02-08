import { Packaging } from 'src/packaging/entities/packaging.entity';
import { StockEntry } from 'src/stock_entry/entities/stock_entry.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';


@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  details: string;

  @Column()
  capacity: number; // Maximum capacity of the stock

  @Column({ nullable: true })
  available_stock: number; // Current available stock (to be calculated)

  @OneToMany(() => StockEntry, (stockEntry) => stockEntry.stock, { cascade: true })
  stockEntries: StockEntry[];
  

  @OneToOne(() => User, (user) => user.stock)
  @JoinColumn()
  managed_by: User;

  @OneToMany(()=>Packaging,(packagings) => packagings.stock)
  packagings: Packaging[];

  @CreateDateColumn()
  createdate: Date;

  @UpdateDateColumn()
  updatedate: Date;
}