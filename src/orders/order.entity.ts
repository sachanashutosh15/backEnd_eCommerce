import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SqlOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  status: string;
}