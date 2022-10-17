import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent {
  @Input() stepData: any = {};
  @Output() onNextStep = new EventEmitter<string>();

  constructor() { }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
