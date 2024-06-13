// game.component.ts
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SocketService } from '../services/socket.service';
import { RoomDataService } from '../services/room-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChild('mainCanvas') mainCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineWidthInput') lineWidthInput?: ElementRef<HTMLInputElement>;
  @ViewChild('lineWidthDisplay') lineWidthDisplay?: ElementRef<HTMLElement>;
  @ViewChild('clearButton') clearButton?: ElementRef<HTMLButtonElement>;

  private context!: CanvasRenderingContext2D;
  private initialX = 0;
  private initialY = 0;
  private correccionX = 0;
  private correccionY = 0;
  private color = '#000';
  private lineWidth = 5;

  private drawing = false;
  roomId: number = 0;
  userName: string = '';
  userAvatar: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private socketService: SocketService,
    private roomDataService: RoomDataService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener datos del servicio
    this.roomId = this.roomDataService.getRoomId();
    this.userName = this.roomDataService.getUserName();
    this.userAvatar = this.roomDataService.getUserAvatar();

    if (this.roomId === 0 || this.userName === '') {
      // Redirigir al usuario a la página de join si no hay datos válidos
      this.router.navigate(['/join']);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupCanvas();
      this.setupEventListeners();
    }
  }

  private setupCanvas() {
    if (this.mainCanvas) {
      const canvas = this.mainCanvas.nativeElement;
      this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
      this.resizeCanvas();
      window.addEventListener('resize', this.resizeCanvas.bind(this));
      
      // Calcular las correcciones de coordenadas
      const rect = canvas.getBoundingClientRect();
      this.correccionX = rect.left;
      this.correccionY = rect.top;
    }
  }

  private setupEventListeners() {
    if (this.mainCanvas) {
      this.mainCanvas.nativeElement.addEventListener('mousedown', this.mouseDown.bind(this));
      this.mainCanvas.nativeElement.addEventListener('mouseup', this.mouseUp.bind(this));
      this.mainCanvas.nativeElement.addEventListener('mouseleave', this.mouseUp.bind(this));
      this.mainCanvas.nativeElement.addEventListener('touchstart', this.mouseDown.bind(this));
      this.mainCanvas.nativeElement.addEventListener('touchend', this.mouseUp.bind(this));
      this.mainCanvas.nativeElement.addEventListener('touchcancel', this.mouseUp.bind(this));
    }

    if (this.lineWidthInput && this.lineWidthDisplay) {
      this.lineWidthInput.nativeElement.addEventListener('input', this.updateLineWidth.bind(this));
    }

    if (this.clearButton) {
      this.clearButton.nativeElement.addEventListener('click', this.clearCanvas.bind(this));
    }
  }

  private resizeCanvas() {
    if (this.mainCanvas) {
      const canvas = this.mainCanvas.nativeElement;
      canvas.width = canvas.parentElement?.offsetWidth || canvas.width;
      canvas.height = canvas.parentElement?.offsetHeight || canvas.height;
      
      // Actualizar las correcciones de coordenadas
      const rect = canvas.getBoundingClientRect();
      this.correccionX = rect.left;
      this.correccionY = rect.top;
    }
  }

  setColor(newColor: string) {
    this.color = newColor;
  }

  private draw(cursorX: number, cursorY: number) {
    this.context.beginPath();
    this.context.moveTo(this.initialX, this.initialY);
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.color;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.lineTo(cursorX, cursorY);
    this.context.stroke();

    this.initialX = cursorX;
    this.initialY = cursorY;
  }

  private mouseDown(event: MouseEvent | TouchEvent) {
    this.initialX = event instanceof MouseEvent ? event.clientX - this.correccionX : event.touches[0].clientX - this.correccionX;
    this.initialY = event instanceof MouseEvent ? event.clientY - this.correccionY : event.touches[0].clientY - this.correccionY;
    this.drawing = true;
    this.mainCanvas?.nativeElement.addEventListener('mousemove', this.mouseMove.bind(this));
    this.mainCanvas?.nativeElement.addEventListener('touchmove', this.mouseMove.bind(this));
  }

  private mouseMove(event: MouseEvent | TouchEvent) {
    const cursorX = event instanceof MouseEvent ? event.clientX - this.correccionX : event.touches[0].clientX - this.correccionX;
    const cursorY = event instanceof MouseEvent ? event.clientY - this.correccionY : event.touches[0].clientY - this.correccionY;

    if (this.drawing) {
      this.draw(cursorX, cursorY);
    }
  }

  private mouseUp() {
    this.drawing = false;
    this.mainCanvas?.nativeElement.removeEventListener('mousemove', this.mouseMove.bind(this));
    this.mainCanvas?.nativeElement.removeEventListener('touchmove', this.mouseMove.bind(this));
  }

  private updateLineWidth() {
    if (this.lineWidthInput && this.lineWidthDisplay) {
      this.lineWidth = this.lineWidthInput.nativeElement.valueAsNumber;
      this.lineWidthDisplay.nativeElement.innerText = `Grosor: ${this.lineWidth}`;
    }
  }

  private clearCanvas() {
    if (this.mainCanvas) {
      const canvas = this.mainCanvas.nativeElement;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}
