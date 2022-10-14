import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-food-roulette',
  templateUrl: './food-roulette.component.html',
  styleUrls: ['./food-roulette.component.scss']
})
export class FoodRouletteComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    this.drawRouletteWheel();
  }

  ngOnInit(): void {}

  @Input() height = 500;
  @Input() width = 500;
  @Input() options = ["Helia", "Pate à Nouilles", "BK", "McDonalds", "DaDa", "MAME", "Bun", "Japonais"];

  @Input() stepSize = 25;
  @Input() spinDuration = 5000; // ms
  @Input() outsideRadius = 200;
  @Input() textRadius = 160;
  @Input() insideRadius = 125;

  @Input() itemFont = 'bold 12px Helvetica, Arial';
  @Input() decisionFont = 'bold 30px Helvetica, Arial';

  @Output() spinStart: EventEmitter<void> = new EventEmitter<void>();
  @Output() foodDecisionEnd: EventEmitter<string> = new EventEmitter<string>();

  private _startAngle = 0;
  private _arc = Math.PI / (this.options.length / 2);
  private _spinAngleStart = 0;
  private _spinTimeout: any;
  private _curSpinTime = 0;
  private _spinTimeTotal = 0;

  @ViewChild('roulette', {static: false}) canvas!: ElementRef<HTMLCanvasElement>;

  byte2Hex(n: number) {
    const nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
  }

  RGB2Color(r: number, g: number, b: number) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  getColor(item: number, maxItems: number) {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = Math.PI * 2 / maxItems;

    const red = Math.sin(frequency * item + 2 + phase) * width + center;
    const green = Math.sin(frequency * item + 0 + phase) * width + center;
    const blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return this.RGB2Color(red, green, blue);
  }

  drawRouletteWheel() {
    if (this.canvas.nativeElement.getContext) {
      const ctx = this.canvas.nativeElement.getContext("2d") as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, 500, 500);

      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      ctx.font = this.itemFont;

      for (let i = 0; i < this.options.length; i++) {
        const angle = this._startAngle + i * this._arc;
        //ctx.fillStyle = colors[i];
        ctx.fillStyle = this.getColor(i, this.options.length);

        ctx.beginPath();
        ctx.arc(250, 250, this.outsideRadius, angle, angle + this._arc, false);
        ctx.arc(250, 250, this.insideRadius, angle + this._arc, angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgb(20,20,20)";
        ctx.fillStyle = "white";
        ctx.translate(250 + Math.cos(angle + this._arc / 2) * this.textRadius,
          250 + Math.sin(angle + this._arc / 2) * this.textRadius);
        ctx.rotate(angle + this._arc / 2 + Math.PI / 2);
        const text = this.options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      //Arrow
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(250 - 4, 250 - (this.outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (this.outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (this.outsideRadius - 5));
      ctx.lineTo(250 + 9, 250 - (this.outsideRadius - 5));
      ctx.lineTo(250 + 0, 250 - (this.outsideRadius - 13));
      ctx.lineTo(250 - 9, 250 - (this.outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (this.outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (this.outsideRadius + 5));
      ctx.fill();
    }
  }

  spin() {
    this.spinStart.emit();
    this._spinAngleStart = Math.random() * 125 + 10;
    this._curSpinTime = 0;
    this._spinTimeTotal = Math.random() * 3 + this.spinDuration;
    console.log('spinTimeTotal', this._spinTimeTotal);
    this.rotateWheel();
  }

  rotateWheel() {
    this._curSpinTime += this.stepSize;
    console.log('spintime', this._curSpinTime);
    if (this._curSpinTime >= this._spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    const spinAngle = this._spinAngleStart - this.easeOut(this._curSpinTime, 0, this._spinAngleStart, this._spinTimeTotal);
    this._startAngle += (spinAngle * Math.PI / 180);
    this.drawRouletteWheel();
    this._spinTimeout = setTimeout(() => this.rotateWheel(), this.stepSize);
  }

  stopRotateWheel() {
    const ctx = this.canvas.nativeElement.getContext("2d") as CanvasRenderingContext2D;
    clearTimeout(this._spinTimeout);
    const degrees = this._startAngle * 180 / Math.PI + 90;
    const arcd = this._arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = this.decisionFont;
    const text = this.options[index]
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();

    this.foodDecisionEnd.emit(text);
  }

  easeOut(t: number, b: number, c: number, d: number) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }
}
