import {Request, Response} from 'express';
import { Room } from '../entity/Room.entity';
import { RoomRepository } from '../repository/room.repository';
import { RoomResponse } from '../dto/room.dto';
import { v4 as uuidv4 } from 'uuid';

export class RoomController{
    private roomRepository: RoomRepository = new RoomRepository();

    public getByTitle = async (req: Request, res: Response) => {
        try{
            const title = <string>req.query.title;
            console.log(title);
            const room: RoomResponse = await this.roomRepository.findByTitle(title);
            return res.status(200).json({
                room,
            }); 
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    public getById = async (req: Request, res: Response) =>{
        const {id}=req.params;
        try{
            const room= await this.roomRepository.findById(id);
            return res.status(200).json({room});
        }catch(error){
            res.status(400).json({error: error.message});   
        }
    }

    public getWordsByRoom = async (req: Request, res: Response) =>{
        try{
            const words = await this.roomRepository.findWordsByRoom();
            return res.status(200).json(words);
        }catch(error){
            res.status(400).json({error: error.message});
    }
}

    public getAll = async (req: Request, res: Response) => {
        try {
            const rooms: Room[] = await this.roomRepository.getAll();
            return res.status(200).json(rooms);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const id = uuidv4();
            body['id'] = id;
            const result: Room = await this.roomRepository.save(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const body = req.body;
        try {
            const room: Room = await this.roomRepository.findById(id);
            if (room === null) {
                return res.status(404).json({ error: 'Room not found' });
            }
            const updatedRoom = await this.roomRepository.save(Object.assign(room, body));
            return res.status(200).json(updatedRoom);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const room: Room = await this.roomRepository.findById(id);
            if (room === null) {
                return res.status(404).json({ error: 'Room not found' });
            }
            await this.roomRepository.delete(id);
            return res.status(200).json({ message: 'Room deleted' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}