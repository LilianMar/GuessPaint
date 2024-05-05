import { CategoryRepository } from "../repository/category.repository";
import { Category } from "../entity/Category.entity";
import { CategoryResponse } from "../dto/category.dto";

export class CategoryService {

    private categoryRepository: CategoryRepository ;

    constructor(){
        this.categoryRepository = new CategoryRepository();
    }

    public async save(category: CategoryResponse): Promise<Category> {
        const responseCategory = await this.categoryRepository.findByTitle(category.title.toLowerCase());
        if(!responseCategory){
            return await this.categoryRepository.save(category);
        }
        else{
            throw new Error('Category already exists');
        }
    
    }
    
    public async findByTitle(title: string) {
        return await this.categoryRepository.findByTitle(title.toLowerCase());
    }

    public async findById(id: number): Promise<Category | undefined>{
        const category = await this.categoryRepository.findById(id);
        console.log(category.words);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }

    public async getAll(): Promise<Category[]>{
        return await this.categoryRepository.getAll();
    }

    public async update(category: CategoryResponse): Promise<Category>{
        const categoryExist = await this.categoryRepository.findById(category.id);
        if (!categoryExist) {
            throw new Error('Category not found');
        }
        return await this.categoryRepository.update(category);
    }

    public async delete(id: number) : Promise<void>{
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        await this.categoryRepository.delete(id);
    }
}
