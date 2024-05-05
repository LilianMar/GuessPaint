import { AppDataSource } from "../data-source";
import { CategoryResponse } from "../dto/category.dto";
import { Category } from "../entity/Category.entity";


export class CategoryRepository{

    private repository = AppDataSource.getRepository(Category);

    async save(category: CategoryResponse){
        return this.repository.save(category);
    }

    async findByTitle(title: string) {
        return this.repository.findOneBy({ title });
    }

    async findById(id: number) {
        return this.repository.findOneBy({ id });
    }
    
    async getAll() {
        return this.repository.find();
    }

    async update(category: CategoryResponse) {
        const {id,...updateData} = category;
        await this.repository.update({id}, updateData);
        return this.findById(id);
    }

    async delete (id: number){
        return this.repository.delete(id);
    }
}