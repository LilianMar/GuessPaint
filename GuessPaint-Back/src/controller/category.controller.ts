import { Request, Response } from "express";
import { CategoryResponse } from "../dto/category.dto";
import { CategoryService } from "../service/category.service";

export class CategoryController {

    private categoryService: CategoryService = new CategoryService();

    public getByTexto = async (req: Request, res: Response) => {
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

    public getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const category = await this.categoryService.findById(id);
            if (category === null) {
                res.status(404).json({ error: 'Category doesnt exists' });
            }
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
            res.status(400).json({ error: error.message });
        }
    }

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const result = await this.categoryService.save(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title } = req.body;
        try {
            await this.categoryService.update(id, title);
            res.status(200).json({ message: 'Category Updated' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.categoryService.delete(id);
            res.status(200).json({ message: 'Category Deleted' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
