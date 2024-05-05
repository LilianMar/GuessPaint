import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    JoinTable
    } from "typeorm";
    import { Category } from "./Category.entity";
    
    @Entity({ name: "words" })
    export class Word extends BaseEntity {
        @PrimaryGeneratedColumn({name: 'word_id'})
        id: number;

        @Column({name: 'texto', type: 'varchar', nullable: false  })
        texto: string;

        @ManyToMany(
            ()=> Category,
            category => category.words)
        @JoinTable({
            name: 'words_category',
            joinColumn: {
                name:'word_id',
                referencedColumnName: 'id'
            },
            inverseJoinColumn: {
                name: 'category_id',
                referencedColumnName: 'id'
            }
        })
        categories?: Category[];

    }