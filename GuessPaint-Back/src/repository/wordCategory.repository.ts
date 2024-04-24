import { AppDataSource } from "../data-source";
import { WordCategory } from "../entity/WordCategory.entity";

export class WordCategoryRepository{
    private repository = AppDataSource.getRepository(WordCategory);

    async findByWordId(word_id: string) {//word_id string??
        return this.repository.findOneBy({  });
    }

    async findByCategoryId(category_id: string) { //category_id string??
        return this.repository.findOneBy({  });
    }

    async getAll() {
        return this.repository.find();
    }

    async save(wordCategory: WordCategory){
        return this.repository.save(wordCategory);
    }
    

    async delete (id: string){
        return this.repository.delete(id);
    }
}
