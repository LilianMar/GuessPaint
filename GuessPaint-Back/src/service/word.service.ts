import { WordRepository } from "../repository/word.repository";
import { Word } from "../entity/Word.entity";
import { WordResponse } from "../dto/word.dto";

export class WordService {
    private wordRepository: WordRepository ;

    constructor(){
        this.wordRepository = new WordRepository();
    }

    public async save(word: WordResponse): Promise<Word> {
        const responseWord = await this.wordRepository.findByTexto(word.texto.toLowerCase());
        if(!responseWord){
            return await this.wordRepository.save(word); 
        }
        else{
            throw new Error('Word already exists');
        }   
    }

    public async findByTexto(texto: string){
        return await this.wordRepository.findByTexto(texto.toLowerCase());
    }

    public async findById(id: number): Promise<Word | undefined> {
        const word = await this.wordRepository.findById(id);
        if (!word) {
            throw new Error('Word not found');
        }
        return word;
    }

    public async getAll(): Promise<Word[]> {
        return await this.wordRepository.getAll();
    }

    

    public async update(word:WordResponse): Promise<Word>{
        const wordExist = await this.wordRepository.findById(word.id);
        if (!wordExist) {
            throw new Error('Word not found');
        }
        return await this.wordRepository.update(word);
    }


    public async delete(id: number): Promise<void> {
        const word = await this.wordRepository.findById(id);
        if (!word) {
            throw new Error('Word not found');
        }
        await this.wordRepository.delete(id);
    }
}
