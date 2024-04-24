import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    JoinColumn,
    ManyToOne
    } from "typeorm";
import { Category } from "./Category.entity";

    @Entity({ name: "rooms" })
    export class Room extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        @Column({ nullable: false })
        title: string;
        

        @Column({ nullable: false,  name: "category_id" })
        categoryId: string;

        @ManyToOne(() => Category, {nullable: false})
        @JoinColumn({ name: "category_id"})
        category: Category;

        @Column({ nullable: false })
        progress: string;  
    }