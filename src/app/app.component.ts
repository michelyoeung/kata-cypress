import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GOOGLE_API_KEY } from "../../env";
import {ICircleStep} from "./components-library/circle-steps/circle-step.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  apiLoaded: Observable<boolean>;

  choiceOfRestaurant: string[] = [];
  MAX_STEPS = 4;

  currentStep = 0;
  steps: ICircleStep[] = [
    { id: 0, onClick: () => {} },
    { id: 1, onClick: () => {} },
    { id: 2, onClick: () => {} },
    { id: 3, onClick: () => {} },
    { id: 4, onClick: () => {} }
  ];

  stepData = '';

  constructor(private httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

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
   const restaurant = this.httpClient.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude}%2C${position.coords.longitude}&radius=1000&type=restaurant&key=${GOOGLE_API_KEY}`)
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

  isFirstStep(): boolean {
    return this.currentStep === 0;
  }

  isFirstContentStep(): boolean {
    return this.currentStep === this.firstContentStep;
  }

  get firstContentStep(): number {
    return 1;
  }

  isLastStep(): boolean {
    return this.currentStep === this.MAX_STEPS;
  }

  goPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    }
  }

  goNextStep(selected: string): void {
    if (this.currentStep < this.MAX_STEPS) {
      this.stepData = selected;
      this.currentStep += 1;
    }
  }
}
