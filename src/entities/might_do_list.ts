import {
  Entity,
  BaseEntity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Highlight } from "./highlight";

@Entity("might_do_list")
export class MightDoList extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  uid: string;

  @Column({
    name: "title",
  })
  title: string;

  @Column({
    type: "text",
    array: true,
    nullable: true,
    name: "might_do_tasks",
  })
  mightDoTasks: string[] = [];

  @Column({
    type: "text",
    array: true,
    nullable: true,
    name: "selected_tasks",
  })
  selectedTasks: string[] = [];

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;

  @OneToOne(
    () => Highlight,
    highlight => highlight.mightDoList
  )
  @JoinColumn({
    name: "highlight"
  })
  highlight: Highlight
}
