import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SocketService } from '../../services/socket.service'; // Asegúrate de que la ruta del servicio sea correcta
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() roomId: number = 0; // Definir roomId como una propiedad de entrada
  newMessage: string = '';
  messages: string[] = [];
  private messageSubscription: Subscription = new Subscription();

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.messageSubscription = this.socketService.$subject.subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const formattedMessage = {
        type: 'SEND_MESSAGE',
        data: this.newMessage
      };
      this.socketService.sendMessage(formattedMessage); // Enviar el mensaje formateado
      this.messages.push(this.newMessage); // Agregar el mensaje a la lista localmente
      this.newMessage = '';
    }
  }
}
