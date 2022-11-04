import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { getFakeRestaurants } from './utils/fakeData';

enum RESTAURANT_PRICE {
  CHEAP = 'cheap',
  MODERATE = 'moderate',
  EXPENSIVE = 'expensive',
  ALL = 'all',
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _restaurants$ = new Subject();
  restaurants$ = this._restaurants$.asObservable();

  constructor() {}

  getNearbyRestaurant(options: any): void {
    let minprice: string = '';
    let maxprice: string = '';
    let fakeRestaurants: any[] = [];
    switch (options.priceRange) {
      case RESTAURANT_PRICE.CHEAP:
        fakeRestaurants = getFakeRestaurants('1');
        break;
      case RESTAURANT_PRICE.MODERATE:
        fakeRestaurants = getFakeRestaurants('2');
        break;
      case RESTAURANT_PRICE.EXPENSIVE:
        fakeRestaurants = getFakeRestaurants('3');
        break;
      case RESTAURANT_PRICE.ALL:
        fakeRestaurants = getFakeRestaurants();
        break;
    }
    this._restaurants$.next({
      results: fakeRestaurants,
    });
  }
}
