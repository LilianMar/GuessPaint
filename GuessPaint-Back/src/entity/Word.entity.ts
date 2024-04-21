import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    } from "typeorm";
    @Entity({ name: "words" })
    export class Word extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        @Column({ nullable: false })
        texto: string;
    }