import {
  Entity,
  BaseEntity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("trivial_question")
export class TrivialQuestion extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  uid: string;

  @Column({
    name: "question",
  })
  title: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;
}
