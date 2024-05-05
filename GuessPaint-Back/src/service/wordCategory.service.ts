import { WordCategoryRepository } from "../repository/wordCategory.repository";
import { WordCategory } from "../entity/WordCategory.entity";
import { WordRepository } from "../repository/word.repository";
import { CategoryRepository } from "../repository/category.repository";
import { WordCategoryResponse } from "../dto/wordCategory.dto";

export class WordCategoryService {
    private wordCategoryRepository: WordCategoryRepository ;
    private wordRepository: WordRepository ;
    private categoryRepository: CategoryRepository ;

    constructor(){
        this.wordCategoryRepository = new WordCategoryRepository();
        this.wordRepository = new WordRepository();
        this.categoryRepository = new CategoryRepository();
    }

    public async save(wordCategory: WordCategoryResponse): Promise<WordCategory> {
        const responseByIdWord = await this.wordRepository.findById(wordCategory.wordId);
        const responseByIdCategory = await this.categoryRepository.findById(wordCategory.categoryId);
        wordCategory.wordId = responseByIdWord.id;
        wordCategory.categoryId = responseByIdCategory.id;
        const wc_id= parseInt(responseByIdWord.id.toString() + responseByIdCategory.id.toString());
        wordCategory.id = wc_id;

        console.log(responseByIdWord.id)
        console.log(responseByIdCategory.id)
        console.log(wc_id)
        console.log(wordCategory)



        if(!responseByIdWord || !responseByIdCategory){
            throw new Error('Word or Category not found');
        }
        return await this.wordCategoryRepository.save(wordCategory);
    }

    public async findById(id: number): Promise<WordCategory | undefined> {
        const wordCategory = await this.wordCategoryRepository.findById(id);
        if (!wordCategory) {
            throw new Error('WordCategory not found');
        }
        return wordCategory;
    }

    public async getAll(): Promise<WordCategory[]> {
        return await this.wordCategoryRepository.getAll();
    }

    public async delete(id: number) {
        const wordCategoryExist = await this.wordCategoryRepository.findById(id);
        if (!wordCategoryExist) {
            throw new Error('WordCategory not found');
        }
        else{
        return await this.wordCategoryRepository.delete(id);
        }
    }

}
