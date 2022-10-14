import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss']
})
export class StepFiveComponent implements OnInit {
  @Input() stepData: any = {};
  @Output() onNextStep = new EventEmitter<string>();
  choiceOfRestaurants : any;
  isLoading = true;

  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this._api.getNearbyRestaurant(this.stepData);
    this._api.restaurants$.subscribe((restaurants) => {
      if (restaurants?.results?.length) {
        this.choiceOfRestaurants = restaurants;
        this.isLoading = false;
      }
    });
    console.log(this.stepData);
  }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }

  getRestaurantName(){
    const choiceOfRestaurantName: string[] = [];
    this.choiceOfRestaurants.results?.map((restaurant : any) => {
      choiceOfRestaurantName.push(restaurant.name)
    })
    return choiceOfRestaurantName;
  }
}
