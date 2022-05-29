import {
    Entity,
    BaseEntity,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryColumn,
  } from "typeorm";
  
  @Entity("trivial_question")
  export class TrivialQuestion extends BaseEntity {
    @PrimaryColumn({
      type: "uuid",
    })
    id: string;
  
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
  