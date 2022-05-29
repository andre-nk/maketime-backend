import {
  Entity,
  BaseEntity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MightDoList } from "./might_do_list";

@Entity("highlight")
export class Highlight extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  uid: string;

  @Column()
  highlight: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;

  @OneToOne(() => MightDoList, (mightDoList) => mightDoList.highlight)
  mightDoList: MightDoList;
}
