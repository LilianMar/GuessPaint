import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    } from "typeorm";
    @Entity({ name: "words_category" })
    export class WordCategory extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        //word_category_word_id_fkey
        //word_category_category_id_fkey
    }