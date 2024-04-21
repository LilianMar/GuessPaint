
import { Category } from "../entity/Category.entity";
import { AppDataSource } from "../data-source";

export class CategoryRepository{
    private repository = AppDataSource.getRepository(Category);


    async findByTitle(title: string) {
        return this.repository.findOneBy({ title });
    }


    async findById(id: string) {
        return this.repository.findOneBy({ id });
    }
    
    async getAll() {
        return this.repository.find();
    }

    async save(category: Category){
        return this.repository.save(category);
    }
    
    async delete (id: string){
        return this.repository.delete(id);
    }
}