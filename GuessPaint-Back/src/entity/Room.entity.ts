import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    JoinColumn
    } from "typeorm";
import { Category } from "./Category.entity";

    @Entity({ name: "rooms" })
    export class Room extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        @Column({ nullable: false })
        title: string;
        
        @ManyToMany(() => Category, {nullable: false})
        @JoinColumn({ name: "category_id"})
        category_id: Category;

        @Column({ nullable: false })
        progress: string;  
    }