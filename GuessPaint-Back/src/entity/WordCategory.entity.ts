import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn
    } from "typeorm";
import { Word } from "./Word.entity";
import { Category } from "./Category.entity";


    @Entity({ name: "words_category" })
    export class WordCategory extends BaseEntity {
        @PrimaryColumn()
        id: string;
        
        @ManyToOne(() => Word, {nullable: false})
        @JoinColumn({ name: "word_id"})
        word_id: Word;

        @ManyToOne(() => Category, {nullable: false})
        @JoinColumn({ name: "category_id"})
        category_id: Category;

    }