import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss']
})
export class StepFiveComponent implements OnInit {
  @Output() onNextStep = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
