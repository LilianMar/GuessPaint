import { AppDataSource } from "../data-source";
import { WordResponse } from "../dto/word.dto";
import { Word } from "../entity/Word.entity";


export class WordRepository{

    private repository = AppDataSource.getRepository(Word);

    async save(word: WordResponse){
        return this.repository.save(word);
    }

    async findByTexto(texto: string) {
        return this.repository.findOneBy({ texto });
    }

    async findById(id: number) {
        return this.repository.findOneBy({ id });
    }
    
    async getAll() {
        return this.repository.find();
    }

    async update(word: WordResponse) {
        const {id,...updateData} = word;
        await this.repository.update({id}, updateData);
        return this.findById(id);
    }
    
    async delete (id: number){
        return this.repository.delete(id);
    }
}