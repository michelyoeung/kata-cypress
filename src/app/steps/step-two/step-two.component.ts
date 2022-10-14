import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
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
