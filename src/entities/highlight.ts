import { Entity, BaseEntity, Column, UpdateDateColumn, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity('highlight')
export class Highlight extends BaseEntity {
    @PrimaryColumn({
        type: "uuid"
    })
    id: string;

    @Column()
    highlight: string;

    @CreateDateColumn({
        name: "created_at"
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at"
    })
    updatedAt: Date;
}