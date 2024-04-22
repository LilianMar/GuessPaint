
import { Room } from "../entity/Room.entity";
import { AppDataSource } from "../data-source";
import { WordCategory } from "../entity/WordCategory.entity";

export class RoomRepository{
    private repository = AppDataSource.getRepository(Room);
    private wordCategoryRepository = AppDataSource.getRepository(WordCategory);

    async findByTitle(title: string) {
        return this.repository.findOneBy({ title });
    }


    async findById(id: string) {
        return this.repository.findOneBy({ id });
    }

    async findWordsByRoom() {
        //llamar el metodo findAll de word category con la categoria asociada ala sala
        
        //return this.repository.find({relations: ["words"]});
    }
    
    async getAll() {
        return this.repository.find();
    }

    async save(room: Room){
        return this.repository.save(room);
    }
    
    async delete (id: string){
        return this.repository.delete(id);
    }
}