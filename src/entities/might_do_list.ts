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

  //One Might-Do List can only have one highlight, which will be included in this table via @JoinColumn
  @OneToOne(
    () => Highlight,
    //This connection chain is available on both files
    (highlight) => highlight.mightDoList,
    {
      onDelete: "SET NULL",
    }
  )
  @JoinColumn({
    name: "highlight",
  })
  highlight: Highlight;
}
