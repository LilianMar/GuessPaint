import { Request, Response } from "express";
import { CategoryResponse } from "../dto/category.dto";
import { CategoryRepository } from "../repository/category.repository";
import { Category } from "../entity/Category.entity";
import { v4 as uuidv4 } from 'uuid';

export class CategoryController{
    
    private categoryRepository: CategoryRepository = new CategoryRepository();
    public getByTexto = async (req: Request, res: Response) => {
        try {
            const title = <string>req.query.title;
            console.log(title);
            const category: CategoryResponse = await this.categoryRepository.findByTitle(title);
            return res.status(200).json({
                category,
                    });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            console.log('Promise unresolved');
            const category = await this.categoryRepository.findById(id);
            if(category === null){
                res.status(404).json({ error: 'Category doesnt exists'});
            }
            res.status(200).json({category});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const categories: Category[] = await this.categoryRepository.getAll();
            return res.status(200).json(categories);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            
            const id = uuidv4();
            body['id']= id;
            const result: Category = await this.categoryRepository.save(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const id = body.id;
            let categoryToUpdate: Category = await this.categoryRepository.findById(id);
            categoryToUpdate = {
                ...body
            } 
            const result: Category = await this.categoryRepository.save(categoryToUpdate);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            await this.categoryRepository.delete(id);
            res.status(200).json({message: 'Deleted'});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }



}