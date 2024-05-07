import { Request, Response } from 'express';
import { RoomService } from '../service/room.service';
import { Room } from '../entity/Room.entity';

export class RoomController {
    private roomService: RoomService;

    constructor() {
        this.roomService = new RoomService();
    }

    public save = async (req: Request, res: Response) => {
        const room = req.body;
        try {
            const result: Room = await this.roomService.save(room);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const room = await this.roomService.findById(+id);
            return res.status(200).json({ room });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public findWordsByRoom = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const words = await this.roomService.findWordsByRoom(+id);

            return res.status(200).json(words);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const rooms = await this.roomService.getAll();
            return res.status(200).json(rooms);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const room = req.body;
        try {
            const result: Room = await this.roomService.updateRoom(room);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.roomService.delete(+id);
            return res.status(200).json({ message: 'Room deleted' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
