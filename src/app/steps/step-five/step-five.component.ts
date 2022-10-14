import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {ApiService} from "../../api.service";
import {take} from "rxjs";

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss']
})
export class StepFiveComponent implements OnInit {
  @Input() stepData: any = {};
  @Output() onNextStep = new EventEmitter<string>();
  choiceOfRestaurantsNames: string[] = [];
  choiceOfRestaurants : any;
  isLoading = true;

  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this._api.getNearbyRestaurant(this.stepData);
    this._api.restaurants$.pipe(take(1)).subscribe((restaurants) => {
      if ((restaurants as any)?.results?.length) {
        this.choiceOfRestaurants = restaurants;
        const restaurantsNames = this.choiceOfRestaurants.results
          .filter((restaurant: any) =>
            !restaurant.name.toLowerCase().startsWith('hotel')
            && !restaurant.name.toLowerCase().startsWith('hôtel')
            && !restaurant.name.toLowerCase().startsWith("l'hôtel")
          )
          .map((restaurant: any) => restaurant.name);
        this.choiceOfRestaurantsNames = restaurantsNames.slice(0, 10);
        console.log('[TEST] choiceOfRestaurantsNames :', this.choiceOfRestaurantsNames);
        this.isLoading = false;
      }
    });
    console.log(this.stepData);
  }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }

  openMapsPage(resultingRestaurant: string): void {
    console.log('[TEST] name result : ', resultingRestaurant);
    setTimeout(() => {
      this.goNextStep(resultingRestaurant)
    }, 3000);
  }
}
