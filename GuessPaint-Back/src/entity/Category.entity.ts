import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    JoinTable
    } from "typeorm";
import { Word } from "./Word.entity";
    
    @Entity({ name: "categories" })
    export class Category extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        @Column({ nullable: false })
        title: string;

        
        @ManyToMany(
            ()=> Word,
            word => word.categories,
            {onDelete: 'NO ACTION', onUpdate: 'NO ACTION', eager: true}
          )
        words?: Word[];
    }