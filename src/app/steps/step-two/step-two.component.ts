import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent {
  @Input() stepData: any = {};
  @Output() onNextStep = new EventEmitter<string>();

  constructor() { }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
