import { Request, Response } from "express";
import { WordCategoryService } from "../service/wordCategory.service";

export class WordCategoryController {
    private wordCategoryService: WordCategoryService ;

    constructor(){
        this.wordCategoryService = new WordCategoryService();
    }

    public save = async (req: Request, res: Response) => {
        const wordCategory = req.body;
        const wc_id= parseInt(wordCategory.wordId.toString() + wordCategory.categoryId.toString());
        wordCategory.id = wc_id;
        console.log(wc_id)
        try {
            const result = await this.wordCategoryService.save(wordCategory);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }     

    public findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const wordCategory = await this.wordCategoryService.findById(+id);

            return res.status(200).json(wordCategory);
        } catch (error) {
            return res.status(400).json({ error: error.message });
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

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await this.wordCategoryService.delete(+id);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }  
}
