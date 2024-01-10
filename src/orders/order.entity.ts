import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column('int')
  quantity: number;

  @Column()
  status: string;
}