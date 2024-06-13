import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private ws: WebSocket | undefined;
  private url: string = 'ws://localhost:3000/ws/room/'; // Asegúrate de usar 'ws://' para WebSocket

  subject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public $subject: Observable<any> = this.subject.asObservable();

  constructor() {}

  connect(idRoom: number, userName: string, userAvatar: string) {
    userAvatar = userAvatar.trim();
    userName = userName.trim();
    const fullUrl = `${this.url}${idRoom}/${userName}/${userAvatar}`;
    this.ws = new WebSocket(fullUrl);
    console.log(fullUrl);

    this.ws.onopen = () => {
      console.log('Connected to server');
    };

    this.ws.onmessage = (msg) => {
      this.subject.next(msg.data);
    };

    this.ws.onerror = (err) => {
      console.error('WebSocket Error', err);
    };

    this.ws.onclose = (event) => {
      console.log('Disconnected from the server', event.reason);
    };
  }

  sendMessage(message: any) {
    if (this.ws) {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(message)); // Asegúrate de que el mensaje se envíe como una cadena JSON
      } else {
        console.error('WebSocket is not open, state: ' + this.ws.readyState);
      }
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
