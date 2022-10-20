import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { fakeRestaurant } from './utils/fakeData';

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
    switch(options.priceRange) {
      case 'cheap':
        minprice = '0'
        maxprice = '1'
        break;
      case 'moderate':
        minprice = '1'
        maxprice = '2'
        break;
      case 'expensive' :
        minprice = '2'
        maxprice = '4'
        break;
      case 'all' :
        minprice = '0'
        maxprice = '4'
        break;
    }
    if (navigator.geolocation) {
      this._restaurants$.next({
        results: fakeRestaurant,
      });
    } else {
      console.log('No support for geolocation');
    }
  }
}
