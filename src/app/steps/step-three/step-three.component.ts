import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {
  @Output() onNextStep = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
