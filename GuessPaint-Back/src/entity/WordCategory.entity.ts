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
        @PrimaryColumn({name: 'wordcategory_id'})
        id: number;
        
        @Column({name: 'word_id' , nullable: false})
        wordId: number;
        
        @Column({name: 'category_id',  nullable: false})
        categoryId: number;
        

        @ManyToOne(() => Word, {nullable: false})
        @JoinColumn({ name: "word_id", referencedColumnName: 'id'})
        words: Word[];

        @ManyToOne(() => Category, {nullable: false})
        @JoinColumn({ name: "category_id", referencedColumnName: 'id'})
        categories: Category[];

    }