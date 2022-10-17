import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// @ts-ignore
import ConfettiGenerator from "confetti-js";
import JSConfetti from 'js-confetti'
// @ts-ignore
import { Curtains, Plane } from 'curtainsjs';
@Component({
  selector: 'app-food-roulette',
  templateUrl: './food-roulette.component.html',
  styleUrls: ['./food-roulette.component.scss']
})
export class FoodRouletteComponent implements OnInit, AfterViewInit {
  @Input() height = 500;
  @Input() width = 500;
  @Input() options = ["Helia", "Pate à Nouilles", "BK", "McDonalds", "DaDa", "MAME", "Bun", "Japonais"];

  @Input() stepSize = 25;
  @Input() spinDuration = 5000; // ms
  @Input() outsideRadius = 200;
  @Input() textRadius = 160;
  @Input() insideRadius = 125;

  @Input() itemFont = 'bold 12px Helvetica, Arial';
  @Input() decisionFont = 'bold 26px Helvetica, Arial';

  @Input() playSounds: boolean = true;

  @Output() spinStart: EventEmitter<void> = new EventEmitter<void>();
  @Output() foodDecisionEnd: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('roulette', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  _curtainPlane1?: any;
  _confetti_1?: any;
  _confetti_2?: any;

  @ViewChild('curtainPlane1')
  curtainPlaneElement1?: ElementRef;
  @ViewChild('curtainPlane2')
  curtainPlaneElement2?: ElementRef;

  spinSound = new Audio();
  wheelDecisionSound = new Audio();
  bonAppetitSound = new Audio();

  showBtn = true;

  private _startAngle = 0;
  private _spinAngleStart = 0;
  private _spinTimeout: any;
  private _curSpinTime = 0;
  private _spinTimeTotal = 0;

  private get _arc(): number {
    return Math.PI / (this.options.length / 2);
  }

  ngAfterViewInit(): void {
    this.drawRouletteWheel();
    this._confetti_1 = new ConfettiGenerator({ target: 'confetti-canvas', start_from_edge: true, clock: 100 });
    this._confetti_2 = new JSConfetti({});

    if (!this.curtainPlaneElement1 || !this.curtainPlaneElement2) return;
    // addScripts()

    const curtains = new Curtains({
      container: "curtains-canvas"
    });
    const params = {
      vertexShaderID: "plane-vs", // our vertex shader ID
      fragmentShaderID: "plane-fs", // our fragment shader ID
      widthSegments: 10,
      heightSegments: 10,
      uniforms: {
        time: {
          name: "uTime", // uniform name that will be passed to our shaders
          type: "1f", // this means our uniform is a float
          value: 0,
        },
      },
    };
    const plane1 = new Plane(curtains, this.curtainPlaneElement1.nativeElement, params);
    const plane2 = new Plane(curtains, this.curtainPlaneElement2.nativeElement, params);

    const max = 90;
    const min = 70;
    let value = min;
    let side = true;
    let numberOfIterations = 0;

    plane1.onRender(() => {
      setTimeout(() => {
        plane1.relativeTranslation.x -= 10;
      }, 300)
      if (numberOfIterations < 4) {
        numberOfIterations++;
        return;
      }
      numberOfIterations = 0;
      if (value > max || value < min) {
        side = !side;
      }
      if (side) {
        value++;

      } else {
        value--;
      }

      plane1.uniforms.time.value = value;
    });

    plane2.onRender(() => {
      setTimeout(() => {
        plane2.relativeTranslation.x += 10;
      }, 300)
      if (numberOfIterations < 4) {
        numberOfIterations++;
        return;
      }
      numberOfIterations = 0;
      if (value > max || value < min) {
        side = !side;
      }
      if (side) {
        value++;

      } else {
        value--;
      }

      plane2.uniforms.time.value = value;
    });

    curtains.onRender(() => {

    });
  }

  ngOnInit(): void {
    this.spinSound.src = "../../assets/sounds/wheel-spin.wav";
    this.spinSound.load();

    this.wheelDecisionSound.src = "../../assets/sounds/wheel-choice.mp3";
    this.wheelDecisionSound.load();

    this.bonAppetitSound.src = "../../assets/sounds/bon-appetit.mp3";
    this.bonAppetitSound.volume = 1;
    this.bonAppetitSound.load();
  }

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
      ctx.clearRect(0, 0, this.width, this.height);

      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      ctx.font = this.itemFont;

      for (let i = 0; i < this.options.length; i++) {
        const angle = this._startAngle + i * this._arc;
        //ctx.fillStyle = colors[i];
        ctx.fillStyle = this.getColor(i, this.options.length);

        ctx.beginPath();
        ctx.arc(this.width / 2, this.height / 2, this.outsideRadius, angle, angle + this._arc, false);
        ctx.arc(this.width / 2, this.height / 2, this.insideRadius, angle + this._arc, angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgb(20,20,20)";
        ctx.fillStyle = "white";
        ctx.translate(this.width / 2 + Math.cos(angle + this._arc / 2) * this.textRadius,
          this.height / 2 + Math.sin(angle + this._arc / 2) * this.textRadius);
        ctx.rotate(angle + this._arc / 2 + Math.PI / 2);
        const text = this.options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      //Arrow
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(this.width / 2 - 4, this.height / 2 - (this.outsideRadius + 5));
      ctx.lineTo(this.width / 2 + 4, this.height / 2 - (this.outsideRadius + 5));
      ctx.lineTo(this.width / 2 + 4, this.height / 2 - (this.outsideRadius - 5));
      ctx.lineTo(this.width / 2 + 9, this.height / 2 - (this.outsideRadius - 5));
      ctx.lineTo(this.width / 2 + 0, this.height / 2 - (this.outsideRadius - 13));
      ctx.lineTo(this.width / 2 - 9, this.height / 2 - (this.outsideRadius - 5));
      ctx.lineTo(this.width / 2 - 4, this.height / 2 - (this.outsideRadius - 5));
      ctx.lineTo(this.width / 2 - 4, this.height / 2 - (this.outsideRadius + 5));
      ctx.fill();
    }
  }

  spin() {
    this.spinStart.emit();
    this._spinAngleStart = Math.random() * 130 + 10;
    this._curSpinTime = 0;
    this._spinTimeTotal = Math.random() * 3 + this.spinDuration;
    this.rotateWheel();
    if (this.playSounds) this.spinSound.play().then();
    this.showBtn = false;
  }

  rotateWheel() {
    this._curSpinTime += this.stepSize;
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
    ctx.fillText(text, this.width / 2 - ctx.measureText(text).width / 2, this.height / 2 + 10);
    ctx.restore();

    if (this.playSounds) {
      this.wheelDecisionSound.play();
      setTimeout(() => this.bonAppetitSound.play(), 800);
    }
    this._confetti_1.render()
    this._confetti_2.addConfetti({
      confettiNumber: 500,
    })
    this.foodDecisionEnd.emit(text);
  }

  easeOut(t: number, b: number, c: number, d: number) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }
}
