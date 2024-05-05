import { Request, Response } from "express";
import { CategoryResponse } from "../dto/category.dto";
import { CategoryService } from "../service/category.service";

export class CategoryController {

    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    public save = async (req: Request, res: Response) => {
        const category = req.body;
        try {
            const result = await this.categoryService.save(category);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public findByTexto = async (req: Request, res: Response) => {
        try {
            const title = <string>req.query.title;
            console.log(title);
            const category: CategoryResponse = await this.categoryService.findByTitle(title);
            return res.status(200).json({
                category,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const category = await this.categoryService.findById(+id);
            res.status(200).json({ category });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryService.getAll();
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const category = req.body;
        try {
            await this.categoryService.update(category);
            return res.status(200).json({ message: 'Category Updated' , category});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.categoryService.delete(+id);
            return res.status(200).json({ message: `Category with id: ${ id } deleted successfully.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
