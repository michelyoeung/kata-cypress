import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss']
})
export class StepFiveComponent implements OnInit {
  @Input() stepData = '';
  @Output() onNextStep = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.stepData);
  }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
