
import { Room } from "../entity/Room.entity";
import { AppDataSource } from "../data-source";
import { WordCategoryRepository } from "../repository/wordCategory.repository";

export class RoomRepository{
    private repository = AppDataSource.getRepository(Room);
    private wordCategoryRepository: WordCategoryRepository = new WordCategoryRepository();

    async findById(id: string) {
        return this.repository.findOneBy({ id });
    }

    async findWordsByRoom(category_id: string) {//revisar
        return this.wordCategoryRepository.findByCategoryId(category_id);
        
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