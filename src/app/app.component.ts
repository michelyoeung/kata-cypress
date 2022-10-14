import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GOOGLE_API_KEY } from "../../env";
import {ICircleStep} from "./components-library/circle-steps/circle-step.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  choiceOfRestaurant: string[] = [];
  MAX_STEPS = 4;

  currentStep = 0;
  steps: ICircleStep[] = [
    { id: 0, onClick: () => {} },
    { id: 1, onClick: () => {} },
    { id: 2, onClick: () => {} },
    { id: 3, onClick: () => {} },
    { id: 4, onClick: () => {} }
  ]

  constructor(private httpClient: HttpClient) {
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
      this.currentStep += 1;
    }
  }
}
