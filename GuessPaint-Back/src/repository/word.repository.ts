
import { Word } from "../entity/Word.entity";
import { AppDataSource } from "../data-source";

export class WordRepository{
    private repository = AppDataSource.getRepository(Word);


    async findByTexto(texto: string) {
        return this.repository.findOneBy({ texto });
    }


    async findById(id: string) {
        return this.repository.findOneBy({ id });
    }
    
    async getAll() {
        return this.repository.find();
    }

    async save(word: Word){
        return this.repository.save(word);
    }
    
    async delete (id: string){
        return this.repository.delete(id);
    }
}