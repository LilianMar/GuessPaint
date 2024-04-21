//guessPaintDB nombre base d edatos pg admin  
import "reflect-metadata";
import { DataSource } from "typeorm";


import { Word } from "./entity/Word.entity";
import { Category } from "./entity/Category.entity";
import { Room } from "./entity/Room.entity";
import { WordCategory } from "./entity/WordCategory.entity";




export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",  
    port:  5432,
    username: "postgres",
    password: "postgres",
    database: "guessPaintDB",
    synchronize: false,
//logging logs sql command on the treminal
    logging:  false,
    entities: [Word, Category, Room, WordCategory],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
});