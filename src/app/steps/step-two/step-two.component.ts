import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
  @Output() onNextStep = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
