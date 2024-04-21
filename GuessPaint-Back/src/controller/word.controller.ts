import { Request, Response } from "express";
import { WordResponse } from "../dto/word.dto";
import { WordRepository } from "../repository/word.repository";
import { Word } from "../entity/Word.entity";
import { v4 as uuidv4 } from 'uuid';

export class WordController{
    
    private wordRepository: WordRepository = new WordRepository();
    public getByTexto = async (req: Request, res: Response) => {
        try {
            const texto = <string>req.query.texto;
            console.log(texto);
            const word: WordResponse = await this.wordRepository.findByTexto(texto);
            return res.status(200).json({
                word,
                    });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            console.log('Promise unresolved');
            const word: Word = await this.wordRepository.findById(id);
            if(word === null){
                res.status(404).json({ error: 'Word doesnt exists'});
            }
            res.status(200).json({word});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const words: Word[] = await this.wordRepository.getAll();
            return res.status(200).json(words);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            
            const id = uuidv4();
            body['id']= id;
            const result: Word = await this.wordRepository.save(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const id = body.id;
            let wordToUpdate: Word = await this.wordRepository.findById(id);
            wordToUpdate = {
                ...body
            } 
            const result: Word = await this.wordRepository.save(wordToUpdate);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            await this.wordRepository.delete(id);
            res.status(200).json({message: 'Deleted'});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }



}