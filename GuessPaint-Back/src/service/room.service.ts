import { RoomRepository } from '../repository/room.repository';
import { Room } from '../entity/Room.entity';
import { RoomResponse } from '../dto/room.dto';
import { CategoryRepository } from '../repository/category.repository';
import { Word } from '../entity/Word.entity';

export class RoomService {
    private roomRepository: RoomRepository ;
    private categoryRepository: CategoryRepository ;

    constructor() {
        this.roomRepository = new RoomRepository();
        this.categoryRepository = new CategoryRepository();
    }

    public async save(room: RoomResponse): Promise<Room> {
        console.log(room);
        const responseByIdCategory = await this.categoryRepository.findById(+room.categoryId);
        console.log(responseByIdCategory);
        console.log(room.categoryId);
        room.progress=room.progress.toLocaleLowerCase();

        if (!responseByIdCategory) {
            throw new Error('Category not found');
        }
        return await this.roomRepository.save(room);
    }

    public async findById(id: number): Promise<Room | undefined> {
        const roomExist = await this.roomRepository.findById(id);
        if (!roomExist) {
            throw new Error('Room not found');
        }
        return roomExist;
    }

    public findWordsByRoom = async (id: number): Promise<Word[]> => {
        const room = await this.roomRepository.findById(id);

        if (!room) throw new Error('Room not found');
        else{
            const category = await this.categoryRepository.findById(room.categoryId);
            return category.words;
        }
    }

    public async getAll(): Promise<Room[]>{
        return await this.roomRepository.getAll();
    }

    public async updateRoom(room: RoomResponse): Promise<Room> {
        const roomExist = await this.roomRepository.findById(room.id);
        const responseByIdCategory = await this.categoryRepository.findById(roomExist.categoryId);
        if (!roomExist || !responseByIdCategory) {
            throw new Error('Room not found or Category not found');
        }
        return await this.roomRepository.update(room);
    }

    public async delete(id: number): Promise<void> {
        const room: Room = await this.roomRepository.findById(id);
        if (!room) {
            throw new Error('Room not found');
        }
        await this.roomRepository.delete(id);
    }
}
