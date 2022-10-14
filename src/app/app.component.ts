import {Component} from '@angular/core';
import {ICircleStep} from "./components-library/circle-steps/circle-step.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  choiceOfRestaurant: string[] = [];
  MAX_STEPS = 4;

  currentStep = 0;
  steps: ICircleStep[] = [
    { label: '', onClick: () => {} },
    { label: '', onClick: () => {} },
    { label: '', onClick: () => {} },
    { label: '', onClick: () => {} },
    { label: '', onClick: () => {} }
  ];

  stepData = '';

  isFirstStep(): boolean {
    return this.currentStep === 0;
  }

  isFirstContentStep(): boolean {
    return this.currentStep === 1;
  }

  isLastStep(): boolean {
    return this.currentStep === this.MAX_STEPS;
  }

  goPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    }
  }

  goNextStep(selected: string): void {
    if (this.currentStep < this.MAX_STEPS) {
      this.stepData = selected;
      this.currentStep += 1;
    }
  }
}
