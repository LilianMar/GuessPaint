import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column
    } from "typeorm";
import { Word } from "./Word.entity";
import { Category } from "./Category.entity";

    @Entity({ name: "words_category" })
    export class WordCategory extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        id: string;
        
        @Column({ nullable: false })
        word_id: string;

        @Column({ nullable: false })
        category_id: string;

    }