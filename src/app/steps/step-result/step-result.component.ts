import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-step-result',
  templateUrl: './step-result.component.html',
  styleUrls: ['./step-result.component.scss']
})
export class StepResultComponent {
  @Input() resultingRestaurant: any = null;
}
