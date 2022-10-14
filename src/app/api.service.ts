import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GOOGLE_API_KEY} from "../../env";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _restaurants$ = new Subject();
  restaurants$ = this._restaurants$.asObservable();

  constructor(private httpClient: HttpClient) { }


  getNearbyRestaurant(options : any): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position)=> {
        this.httpClient.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude}%2C${position.coords.longitude}&radius=500&type=restaurant&key=${GOOGLE_API_KEY}`).subscribe((results) => {
          this._restaurants$.next(results);
        })
      });
    } else {
      console.log("No support for geolocation")
    }
  }

}
