import { Option } from "./option";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";
import "reflect-metadata";

@Entity()
export class OptionValue {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  value?: string;

  @Column()
  optionId?: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", select: false })
  createdAt?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", select: false })
  updatedAt?: Date;

  @ManyToOne(() => Option, (option) => option.optionValues)
  @JoinColumn({ name: "optionId", referencedColumnName: "id" })
  Option?: Option;
}