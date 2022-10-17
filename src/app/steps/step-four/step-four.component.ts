import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent {
  @Input() stepData: any = {};
  @Output() onNextStep = new EventEmitter<string>();

  constructor() { }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
