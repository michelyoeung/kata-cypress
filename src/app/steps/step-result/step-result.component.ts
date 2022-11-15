import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-result',
  templateUrl: './step-result.component.html',
  styleUrls: ['./step-result.component.scss'],
})
export class StepResultComponent {
  @Input() resultingRestaurant: any = null;
  @Input() stepData: any = {};

  get priceLevel(): number {
    const priceLevel = parseInt(this.resultingRestaurant?.price_level?.toString() || '0', 10);
    return !isNaN(priceLevel) ? priceLevel : 0;
  }

  get priceLevelArray(): number[] {
    return Array(this.priceLevel).fill('');
  }
}
