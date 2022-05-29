import {
  Entity,
  BaseEntity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("burner_list")
export class BurnerList extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  uid: string;

  @Column({
    name: "title",
  })
  title: string;

  @Column({
    name: "front_burner_title",
  })
  frontBurnerTitle: string;

  @Column({
    type: "text",
    array: true,
    nullable: true,
    name: "front_burner_tasks",
  })
  frontBurnerTasks: string[] = [];

  @Column({
    name: "back_burner_title",
  })
  backBurnerTitle: string;

  @Column({
    type: "text",
    array: true,
    nullable: true,
    name: "back_burner_tasks",
  })
  backBurnerTasks: string[];

  @Column({
    type: "text",
    array: true,
    nullable: true,
    name: "kitchen_sink_tasks",
  })
  kitchenSinkTasks: string[];

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;
}
