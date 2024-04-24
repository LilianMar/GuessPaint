import { Request, Response } from "express";
import { WordResponse } from "../dto/word.dto";
import { WordService } from "../service/word.service";

export class WordController {

    private wordService: WordService = new WordService();

    public getByTexto = async (req: Request, res: Response) => {
        try {
            const texto = <string>req.query.texto;
            console.log(texto);
            const word: WordResponse = await this.wordService.findByTexto(texto);
            return res.status(200).json({
                word,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const word = await this.wordService.findById(id);
            if (word === null) {
                res.status(404).json({ error: 'Word doesnt exists' });
            }
            res.status(200).json({ word });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const words = await this.wordService.getAll();
            return res.status(200).json(words);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            
            const result = await this.wordService.save(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { texto } = req.body;
        try {
            await this.wordService.update(id, texto);
            res.status(200).json({ message: 'Word Updated' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.wordService.delete(id);
            return res.status(200).json({ message: 'Deleted' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
