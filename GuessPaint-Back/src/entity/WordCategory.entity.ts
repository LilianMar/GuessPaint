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
        
        @Column({type: 'varchar', name: 'word_id'})
        wordId: string;
        
        @Column({type: 'varchar', name: 'category_id'})
        categoryId: string;
        

        @ManyToOne(() => Word, {nullable: false})
        @JoinColumn({ name: "word_id", referencedColumnName: 'id'})
        words: Word[];

        @ManyToOne(() => Category, {nullable: false})
        @JoinColumn({ name: "category_id", referencedColumnName: 'id'})
        categories: Category[];

    }