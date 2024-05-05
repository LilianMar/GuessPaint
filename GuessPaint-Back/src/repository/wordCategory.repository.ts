import { AppDataSource } from "../data-source";
import { WordCategoryResponse } from "../dto/wordCategory.dto";
import { WordCategory } from "../entity/WordCategory.entity";

export class WordCategoryRepository{
    private repository = AppDataSource.getRepository(WordCategory);
    

    async save(wordCategory: WordCategoryResponse){
        return this.repository.save(wordCategory);
    }

    async findById(id: number) {    
        return this.repository.findOneBy({ id });
    }

    async getAll() {
        return this.repository.find();
    }

    async delete(id: number){
        return this.repository.delete(id);
    }
}
