import {
  Entity,
  BaseEntity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MightDoList } from "./might_do_list";

@Entity("highlight")
export class Highlight extends BaseEntity {
  //primary (essential for table), and auto-generated w./ type of "uuid"
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  uid: string;

  @Column()
  highlight: string;

  //auto-generated dates, where column name can be specified
  @CreateDateColumn({
    name: "created_at",
    unique: true,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;

  //One highlight can be used by many Might-Do List
  @OneToMany(() => MightDoList, (mightDoList) => mightDoList.highlight, {
    onDelete: "SET NULL",
  })
  mightDoList: MightDoList;
}
