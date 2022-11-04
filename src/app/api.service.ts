import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

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
  static LOCAL_STORAGE_ITEM_PREFIX = 'BOUFFE_ROULETTE_';
  static LOCAL_STORAGE_FIELD_NAME = `${ApiService.LOCAL_STORAGE_ITEM_PREFIX}NAME`;
  static LOCAL_STORAGE_FIELD_AGE = `${ApiService.LOCAL_STORAGE_ITEM_PREFIX}AGE`;

  private _profileName$ = new Subject<string>();
  private _profileAge$ = new Subject<string>();

  profileName$ = this._profileName$.asObservable();
  profileAge$ = this._profileAge$.asObservable();

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

  saveProfileInfos(name: string, age: string): any {
    return of(null).pipe(
      delay(3000),
      tap(() => {
        localStorage.setItem(ApiService.LOCAL_STORAGE_FIELD_NAME, name);
        localStorage.setItem(ApiService.LOCAL_STORAGE_FIELD_AGE, age);
        this._profileName$.next(name);
        this._profileAge$.next(age);
      }),
    );
  }

  getNameFromLocalStorage(): string {
    return localStorage.getItem(ApiService.LOCAL_STORAGE_FIELD_NAME)?.toString() || '';
  }

  getAgeFromLocalStorage(): string {
    return localStorage.getItem(ApiService.LOCAL_STORAGE_FIELD_AGE)?.toString() || '';
  }
}
