import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GOOGLE_API_KEY } from "../../env";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //apiLoaded: Observable<boolean>;
  choiceOfRestaurant: string[];

  constructor(private httpClient: HttpClient) {
    /*this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );*/
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position)=>{
        console.log("position", position)
        this.getNearbyRestaurant(position)
      });
    } else {
      console.log("No support for geolocation")
    }
  }
  getNearbyRestaurant(position: GeolocationPosition){
   const restaurant = this.httpClient.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude}%2C${position.coords.longitude}&radius=1500&type=restaurant&key=${GOOGLE_API_KEY}`)
   restaurant.subscribe((res: any)=> {
     res.results.map((restaurant: any) => {
       this.choiceOfRestaurant.push((restaurant.name));
     })
     return res
   })
  }

  ngOnInit(): void {
    this.getLocation();
  }

  title = 'bouffe-roulette';
}
