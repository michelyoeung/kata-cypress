import { Component, Input } from '@angular/core';
import { ICircleStep } from './circle-step.interface';

@Component({
  selector: 'app-circle-steps',
  templateUrl: './circle-steps.component.html',
  styleUrls: ['./circle-steps.component.scss'],
})
export class CircleStepsComponent {
  @Input() steps: ICircleStep[] = [];
  @Input() activeStep: string = '0';
  @Input() useCurrentActive = false;
  @Input() circleSize: 'small' | 'normal' = 'normal';

  isBeforeActiveStep(currentStep: ICircleStep) {
    const activeIndex = this.steps.findIndex((step) => step.label === this.activeStep);
    const currentIndex = this.steps.findIndex((step) => step.label === currentStep.label);
    return currentIndex < activeIndex;
  }
}
