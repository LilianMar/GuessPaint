import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    JoinColumn,
    ManyToOne
    } from "typeorm";
import { Category } from "./Category.entity";

    @Entity({ name: "rooms" })
    export class Room extends BaseEntity {
        @PrimaryGeneratedColumn({name: 'room_id'})
        id: number;

        @Column({name: 'title', type: 'varchar',  nullable: false })
        title: string;

        @Column({name: 'progress', type: 'varchar', default: 'Sin iniciar', nullable: false})
        progress: string;  

        @Column({name: "category_id" , nullable: false})
        categoryId: number;

        @ManyToOne(() => Category, {nullable: true})
        @JoinColumn({ name: "category_id"})
        categories?: Category[];

        
    }