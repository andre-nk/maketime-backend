import {
    Entity,
    BaseEntity,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryColumn,
  } from "typeorm";
  
  @Entity("stack_rank")
  export class StackRank extends BaseEntity {
    @PrimaryColumn({
      type: "uuid",
    })
    id: string;
  
    @Column({
      name: "title",
    })
    title: string;
  
    @Column({
      type: "text",
      array: true,
      nullable: true,
      name: "priority_list",
    })
    priorityList: string[] = [];
  
    @CreateDateColumn({
      name: "created_at",
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      name: "updated_at",
    })
    updatedAt: Date;
  }
  