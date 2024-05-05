import { AppDataSource } from "../data-source";
import { Room } from "../entity/Room.entity";
import { RoomResponse } from "../dto/room.dto";
import { Category } from "../entity/Category.entity";

export class RoomRepository{
    private repository = AppDataSource.getRepository(Room);
    private categoryRepository = AppDataSource.getRepository(Category);

    async save(room: RoomResponse){
        return this.repository.save(room);
    }

    async findById(id: number) {
        return this.repository.findOneBy({ id });
    }

    async findCategoryByRoom(id: number) {//revisar
        return this.categoryRepository.findOneBy({ id });
    }
    
    async getAll() {
        return this.repository.find();
    }

    async update(room: RoomResponse) {
        const { id, ...updateData } = room;

        await this.repository.update({ id }, updateData);
        
        return this.findById(id);
    }
    
    async delete (id: number){
        return this.repository.delete(id);
    }
}