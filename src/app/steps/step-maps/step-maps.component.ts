import {Component, Input,} from '@angular/core';

@Component({
  selector: 'app-step-maps',
  templateUrl: './step-maps.component.html',
  styleUrls: ['./step-maps.component.scss']
})
export class StepMapsComponent {
  @Input() resultingRestaurant: any = null;
}
