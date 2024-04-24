import { WordRepository } from "../repository/word.repository";
import { Word } from "../entity/Word.entity";
import { v4 as uuidv4 } from 'uuid';

export class WordService {
    private wordRepository: WordRepository = new WordRepository();

    public async findByTexto(texto: string){
        return await this.wordRepository.findByTexto(texto);
    }

    public async findById(id: string): Promise<Word | undefined> {
        return await this.wordRepository.findById(id);
    }

    public async getAll(): Promise<Word[]> {
        return await this.wordRepository.getAll();
    }

    public async save(body: any){
        // agregar la lógica de validación aquí antes de guardar en la base de datos
        const id = uuidv4();
        body['id'] = id;
        return await this.wordRepository.save(body);
    }

    public async update(id: string, texto: string): Promise<void>{
        const word = await this.wordRepository.findById(id);
        if (!word) {
            throw new Error('Word not found');
        }
        word.texto = texto;
        await this.wordRepository.update(word);
    }


    public async delete(id: string): Promise<void> {
        const word = await this.wordRepository.findById(id);
        if (!word) {
            throw new Error('Word not found');
        }
        await this.wordRepository.delete(id);
    }
}
