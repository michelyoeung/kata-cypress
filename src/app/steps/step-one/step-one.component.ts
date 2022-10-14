import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {
  @Output() onNextStep = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
