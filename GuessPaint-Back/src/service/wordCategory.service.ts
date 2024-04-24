import { WordCategoryRepository } from "../repository/wordCategory.repository";
import { WordCategory } from "../entity/WordCategory.entity";

export class WordCategoryService {
    private wordCategoryRepository: WordCategoryRepository = new WordCategoryRepository();

    public async findByCategoryId(category_id: string) {
        return await this.wordCategoryRepository.findByCategoryId(category_id);
    }

    public async findByWordId(word_id: string) {
        return await this.wordCategoryRepository.findByWordId(word_id);
    }

    public async getAll() {
        return await this.wordCategoryRepository.getAll();
    }

    public async save(body: any) {
        return await this.wordCategoryRepository.save(body);
    }

    public async delete(id: string) {
        return await this.wordCategoryRepository.delete(id);
    }

}
