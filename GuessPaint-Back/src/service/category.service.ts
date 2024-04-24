import { CategoryRepository } from "../repository/category.repository";
import { Category } from "../entity/Category.entity";
import { v4 as uuidv4 } from 'uuid';

export class CategoryService {

    private categoryRepository: CategoryRepository = new CategoryRepository();

    public async findByTitle(title: string) {
        return await this.categoryRepository.findByTitle(title);
    }

    public async findById(id: string): Promise<Category | undefined>{
        const category = await this.categoryRepository.findById(id);
        console.log(category.words);
        return category;
    }

    public async getAll(): Promise<Category[]>{
        return await this.categoryRepository.getAll();
    }

    public async save(body: any) {
        const id = uuidv4();
        body['id'] = id;
        return await this.categoryRepository.save(body);
    }

    public async update(id: string, title: string): Promise<void>{
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        category.title = title;
        await this.categoryRepository.update(category);
    }

    public async delete(id: string) : Promise<void>{
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        await this.categoryRepository.delete(id);
    }
}
