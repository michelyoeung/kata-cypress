import { Component, EventEmitter, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss'],
})
export class StepFiveComponent implements OnInit, OnDestroy {
  @Input() stepData: any = {};
  @Output() onNextStep = new EventEmitter<string>();
  choiceOfRestaurantsNames: string[] = [];
  choiceOfRestaurants: any;
  isLoading = true;
  noRestaurant: boolean = false;

  private _destroyed$ = new Subject<void>();

  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this._api.restaurants$.pipe(take(1), takeUntil(this._destroyed$)).subscribe((restaurants) => {
      if ((restaurants as any)?.status === 'ZERO_RESULTS') {
        this.noRestaurant = true;
        this.isLoading = false;
      } else {
        if ((restaurants as any)?.results?.length) {
          this.choiceOfRestaurants = restaurants;
          const restaurantsNames = this.choiceOfRestaurants.results.map((restaurant: any) => restaurant.name);
          this.choiceOfRestaurantsNames = restaurantsNames.slice(0, 10);
          this.isLoading = false;
        }
      }
    });
    this._api.getNearbyRestaurant(this.stepData);
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

  goNextStep(selected: any): void {
    this.onNextStep.emit(selected);
  }

  openMapsPage(resultingRestaurantName: string): void {
    const restaurant = this.choiceOfRestaurants.results?.find(
      (restaurant: any) => restaurant.name === resultingRestaurantName,
    );
    setTimeout(() => {
      this.goNextStep(restaurant);
    }, 3000);
  }
}
