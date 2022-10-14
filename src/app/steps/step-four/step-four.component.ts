import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit {
  @Output() onNextStep = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
