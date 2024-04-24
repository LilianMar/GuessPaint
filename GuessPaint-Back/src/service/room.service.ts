import { RoomRepository } from '../repository/room.repository';
import { Room } from '../entity/Room.entity';

export class RoomService {
    private roomRepository: RoomRepository = new RoomRepository();

    public async findById(id: string) {
        return await this.roomRepository.findById(id);
    }

    public async findWordsByRoom(category_id: string) {//llamoa category y trae las palabbras 
        return await this.roomRepository.findWordsByRoom(category_id);
    }

    public async getAll() {
        return await this.roomRepository.getAll();
    }

    public async save(body: any) {
        return await this.roomRepository.save(body);
    }


    public async delete(id: string) {
        const room: Room = await this.roomRepository.findById(id);
        if (!room) {
            throw new Error('Room not found');
        }
        await this.roomRepository.delete(id);
    }
}
