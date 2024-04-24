import { Request, Response } from "express";
import { WordCategoryService } from "../service/wordCategory.service";

export class WordCategoryController {
    private wordCategoryService: WordCategoryService = new WordCategoryService();


    public getByCategoryId = async (req: Request, res: Response) => {
        try {
            const category_id = <string>req.query.category_id;
            console.log(category_id);
            const wordCategory = await this.wordCategoryService.findByCategoryId(category_id);
            return res.status(200).json({
                wordCategory,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getByWordId = async (req: Request, res: Response) => {
        try {
            const word_id = <string>req.query.word_id;
            console.log(word_id);
            const wordCategory = await this.wordCategoryService.findByWordId(word_id);
            return res.status(200).json({
                wordCategory,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const wordCategories = await this.wordCategoryService.getAll();
            return res.status(200).json(wordCategories);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const id = body.word_id + "*"+ body.category_id;
            body['id'] = id;
            const result = await this.wordCategoryService.save(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await this.wordCategoryService.delete(id);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    
}
