import { Item } from 'src/item/entities/item.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class StockEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item.stockEntries)
  @JoinColumn()
  item: Item;

  @ManyToOne(() => Stock, (stock) => stock.stockEntries)
  @JoinColumn()
  stock: Stock;

  @Column()
  quantity: number; 

  @CreateDateColumn()
    createdate: Date;

  @UpdateDateColumn()
  updatedate: Date;
}