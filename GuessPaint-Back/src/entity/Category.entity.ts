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
        @PrimaryGeneratedColumn({name: 'category_id'})
        id: number;

        @Column({ name: 'title', type: 'varchar', length: 50, nullable: false, unique: true })
        title: string;

        
        @ManyToMany(
            ()=> Word,
            word => word.categories,
            {onDelete: 'NO ACTION', onUpdate: 'NO ACTION', eager: true}
          )
        words?: Word[];
    }