import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GOOGLE_API_KEY } from '../../env';
import { Subject } from 'rxjs';
import { fakeRestaurant } from './utils/fakeData';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _restaurants$ = new Subject();
  restaurants$ = this._restaurants$.asObservable();

  constructor(private httpClient: HttpClient) {}

  getNearbyRestaurant(options: any): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    };
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
      navigator.geolocation.getCurrentPosition((position) => {
        this.httpClient
          .get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude}%2C${position.coords.longitude}&radius=500&minprice=${minprice}&maxprice=${maxprice}&type=restaurant&key=${GOOGLE_API_KEY}`
          )
          .subscribe(
            (results) => {
              this._restaurants$.next(results);
            },
            () => {
              this._restaurants$.next({
                results: fakeRestaurant,
              });
            }
          );
      });
    } else {
      console.log('No support for geolocation');
    }
  }
}
