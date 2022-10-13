import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-food-roulette',
  templateUrl: './food-roulette.component.html',
  styleUrls: ['./food-roulette.component.scss']
})
export class FoodRouletteComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngAfterViewInit(): void {
    this.drawRouletteWheel();
  }

  ngOnInit(): void {
  }

  @Input() options = ["Helia", "Pate à Nouilles", "BK", "McDonalds", "DaDa", "MAME", "Bun", "Japonais"];

  startAngle = 0;
  arc = Math.PI / (this.options.length / 2);
  spinAngleStart = 0;

  spinTimeout: any;

  spinTime = 0;
  spinTimeTotal = 0;

  @ViewChild('roulette', {static: false}) canvas!: ElementRef<HTMLCanvasElement>;

  byte2Hex(n: number) {
    const nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
  }

  RGB2Color(r: number, g: number, b: number) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  getColor(item: number, maxitem: number) {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = Math.PI * 2 / maxitem;

    const red = Math.sin(frequency * item + 2 + phase) * width + center;
    const green = Math.sin(frequency * item + 0 + phase) * width + center;
    const blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return this.RGB2Color(red, green, blue);
  }

  drawRouletteWheel() {
    if (this.canvas.nativeElement.getContext) {
      const outsideRadius = 200;
      const textRadius = 160;
      const insideRadius = 125;

      const ctx = this.canvas.nativeElement.getContext("2d") as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, 500, 500);

      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      ctx.font = 'bold 12px Helvetica, Arial';

      for (let i = 0; i < this.options.length; i++) {
        const angle = this.startAngle + i * this.arc;
        //ctx.fillStyle = colors[i];
        ctx.fillStyle = this.getColor(i, this.options.length);

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
        ctx.arc(250, 250, insideRadius, angle + this.arc, angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgb(220,220,220)";
        ctx.fillStyle = "black";
        ctx.translate(250 + Math.cos(angle + this.arc / 2) * textRadius,
          250 + Math.sin(angle + this.arc / 2) * textRadius);
        ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
        const text = this.options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      //Arrow
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.fill();
    }
  }

  spin() {
    this.spinAngleStart = Math.random() * 10 + 10;
    this.spinTime = 0;
    this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.rotateWheel();
  }

  rotateWheel() {
    this.spinTime += 30;
    console.log('spintime', this.spinTime);
    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    const spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
    this.startAngle += (spinAngle * Math.PI / 180);
    this.drawRouletteWheel();
    this.spinTimeout = setTimeout(() => this.rotateWheel(), 30);
  }

  stopRotateWheel() {
    const ctx = this.canvas.nativeElement.getContext("2d") as CanvasRenderingContext2D;
    clearTimeout(this.spinTimeout);
    const degrees = this.startAngle * 180 / Math.PI + 90;
    const arcd = this.arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial';
    const text = this.options[index]
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
  }

  easeOut(t: number, b: number, c: number, d: number) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }
}
