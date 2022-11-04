import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {
  @Output() onNextStep = new EventEmitter<string>();
  rotate = false;
  constructor() {}

  ngOnInit(): void {}

  click(): void {
    this.rotate = !this.rotate;
  }
  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
