import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomDataService {
  private roomId: number = 0;
  private userName: string = '';
  private userAvatar: string = '';

  constructor() {}

  setRoomData(roomId: number, userName: string, userAvatar: string) {
    this.roomId = roomId;
    this.userName = userName;
    this.userAvatar = userAvatar;
  }

  getRoomId(): number {
    return this.roomId;
  }

  getUserName(): string {
    return this.userName;
  }

  getUserAvatar(): string {
    return this.userAvatar;
  }
}
