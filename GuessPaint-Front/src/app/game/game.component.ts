import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupCanvas();
      this.setupEventListeners();
    }
  }

  private setupCanvas() {
    if (this.mainCanvas) {
      this.context = this.mainCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
      this.resizeCanvas();
      window.addEventListener('resize', this.resizeCanvas.bind(this));
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

    const colorButtons = document.querySelectorAll('.color-option');
    colorButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.color = button.getAttribute('data-color') || this.color;
      });
    });
  }

  private resizeCanvas() {
    if (this.mainCanvas) {
      const canvas = this.mainCanvas.nativeElement;
      canvas.width = canvas.parentElement?.offsetWidth || canvas.width;
      canvas.height = canvas.parentElement?.offsetHeight || canvas.height;
    }
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

  private mouseDown(evt: MouseEvent | TouchEvent) {
    evt.preventDefault();
    this.drawing = true;
    const coords = this.getMouseCoords(evt);
    this.initialX = coords.x;
    this.initialY = coords.y;
    this.draw(this.initialX, this.initialY);

    if (this.mainCanvas) {
      this.mainCanvas.nativeElement.addEventListener('mousemove', this.mouseMoving.bind(this));
      this.mainCanvas.nativeElement.addEventListener('touchmove', this.mouseMoving.bind(this));
    }
  }

  private mouseMoving(evt: MouseEvent | TouchEvent) {
    if (!this.drawing) return;
    evt.preventDefault();
    const coords = this.getMouseCoords(evt);
    this.draw(coords.x, coords.y);
  }

  private mouseUp() {
    this.drawing = false;
    if (this.mainCanvas) {
      this.mainCanvas.nativeElement.removeEventListener('mousemove', this.mouseMoving.bind(this));
      this.mainCanvas.nativeElement.removeEventListener('touchmove', this.mouseMoving.bind(this));
    }
  }

  private getMouseCoords(evt: MouseEvent | TouchEvent): { x: number, y: number } {
    if ('changedTouches' in evt) {
      return {
        x: evt.changedTouches[0].pageX - this.correccionX,
        y: evt.changedTouches[0].pageY - this.correccionY
      };
    } else {
      return {
        x: evt.offsetX,
        y: evt.offsetY
      };
    }
  }

  private updateLineWidth(event: Event) {
    if (this.lineWidthInput && this.lineWidthDisplay) {
      this.lineWidth = parseInt((event.target as HTMLInputElement).value);
      this.lineWidthDisplay.nativeElement.textContent = `Grosor: ${this.lineWidth}`;
    }
  }

  private clearCanvas() {
    if (this.mainCanvas) {
      this.context.clearRect(0, 0, this.mainCanvas.nativeElement.width, this.mainCanvas.nativeElement.height);
    }
  }
}
