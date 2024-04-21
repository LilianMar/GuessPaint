import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    } from "typeorm";
    @Entity({ name: "categories" })
    export class Category extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        @Column({ nullable: false })
        title: string;
    }