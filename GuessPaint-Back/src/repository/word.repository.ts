import { AppDataSource } from "../data-source";
import { Word } from "../entity/Word.entity";


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

    async update(word: Word) {
        return this.repository.update(word.id, word);
    }
    
    async delete (id: string){
        return this.repository.delete(id);
    }
}