import { Request, Response } from 'express';
import { RoomService } from '../service/room.service';
import { Room } from '../entity/Room.entity';
import { v4 as uuidv4 } from 'uuid';

export class RoomController {
    private roomService: RoomService = new RoomService();

    public getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const room = await this.roomService.findById(id);
            return res.status(200).json({ room });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getWordsByRoom = async (req: Request, res: Response) => {
        try {
            const category_id = req.query.category_id as string;
            const words = await this.roomService.findWordsByRoom(category_id);
            return res.status(200).json(words);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const rooms: Room[] = await this.roomService.getAll();
            return res.status(200).json(rooms);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const id = uuidv4();
            body.id = id;
            const result: Room = await this.roomService.save(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.roomService.delete(id);
            return res.status(200).json({ message: 'Room deleted' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
