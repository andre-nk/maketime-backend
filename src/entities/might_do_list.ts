import {
  Entity,
  BaseEntity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
} from "typeorm";

@Entity("might_do_list")
export class MightDoList extends BaseEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  id: string;

  @Column({
    name: "title",
  })
  title: string;

  @Column()
  highlight: string;

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
}
