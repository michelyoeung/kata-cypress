import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {
  TIME_OUT_IN_MS = 3000;

  @Output() onNextStep = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.goNextStep('');
    }, this.TIME_OUT_IN_MS)
  }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
