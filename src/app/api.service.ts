import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GOOGLE_API_KEY} from "../../env";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position)=>{
        this.getNearbyRestaurant(position)
      });
    } else {
      console.log("No support for geolocation")
    }
  }

  getNearbyRestaurant(position: GeolocationPosition){
    const choiceOfRestaurant : string[] = [];
    const restaurant = this.httpClient.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude}%2C${position.coords.longitude}&radius=1000&type=restaurant&key=${GOOGLE_API_KEY}`)
    restaurant.subscribe((res: any)=> {
      res.results.map((restaurant: any) => {
        choiceOfRestaurant.push((restaurant.name));
      })
      return choiceOfRestaurant
    })
  }
}
