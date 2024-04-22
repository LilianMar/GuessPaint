import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity
    } from "typeorm";

    @Entity({ name: "rooms" })
    export class Room extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        @Column({ nullable: false })
        title: string;
        
        @Column({ nullable: false })
        category_id: string;

        @Column({ nullable: false })
        progress: string;

        
    }