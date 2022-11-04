import { Component } from '@angular/core';
import { ICircleStep } from './components-library/circle-steps/circle-step.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  choiceOfRestaurant: string[] = [];
  resultingRestaurant: string = '';
  MAX_STEPS = 5;
  onProfile: boolean = false;

  currentStep = 0;
  steps: ICircleStep[] = [
    { id: 0, onClick: () => {} },
    { id: 1, onClick: () => {} },
    { id: 2, onClick: () => {} },
    { id: 3, onClick: () => {} },
    { id: 4, onClick: () => {} },
    { id: 5, onClick: () => {} },
  ];

  stepData: any = {};

  isFirstStep(): boolean {
    return this.currentStep === 0;
  }

  isFirstContentStep(): boolean {
    return this.currentStep === this.firstContentStep;
  }

  get firstContentStep(): number {
    return 1;
  }

  isLastStep(): boolean {
    return this.currentStep === this.MAX_STEPS;
  }

  goPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    }
  }

  goNextStep(stepData: string, fromStep: number): void {
    if (this.currentStep < this.MAX_STEPS) {
      if (fromStep === 2) {
        this.stepData['regime'] = stepData;
      } else if (fromStep === 3) {
        this.stepData['typeOfFood'] = stepData;
      } else if (fromStep === 4) {
        this.stepData['priceRange'] = stepData;
      }
      this.currentStep += 1;
    }
  }

  goFinalStep(resultingRestaurant: string): void {
    if (this.currentStep < this.MAX_STEPS) {
      this.currentStep += 1;
      this.resultingRestaurant = resultingRestaurant;
    }
  }

  openProfile(): void {
    this.onProfile = !this.onProfile;
  }
}
