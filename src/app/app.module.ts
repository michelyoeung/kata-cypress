import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodRouletteComponent } from './food-roulette/food-roulette.component';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { StepThreeComponent } from './steps/step-three/step-three.component';
import { StepFourComponent } from './steps/step-four/step-four.component';
import { StepFiveComponent } from './steps/step-five/step-five.component';
import { CircleStepsComponent } from "./components-library/circle-steps/circle-steps.component";
import { ChatBubbleComponent } from "./components-library/chat-bubble/chat-bubble.component";

@NgModule({
  declarations: [
    AppComponent,
    CircleStepsComponent,
    ChatBubbleComponent,
    FoodRouletteComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GoogleMapsModule,
        HttpClientModule,
        HttpClientJsonpModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
