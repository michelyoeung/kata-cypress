import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from "@angular/service-worker";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodRouletteComponent } from './food-roulette/food-roulette.component';
import { ProfileComponent } from "./profile/profile.component";
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { StepThreeComponent } from './steps/step-three/step-three.component';
import { StepFourComponent } from './steps/step-four/step-four.component';
import { StepFiveComponent } from './steps/step-five/step-five.component';
import { CircleStepsComponent } from "./components-library/circle-steps/circle-steps.component";
import { ChatBubbleComponent } from "./components-library/chat-bubble/chat-bubble.component";
import { StepResultComponent } from "./steps/step-result/step-result.component";

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CircleStepsComponent,
    ChatBubbleComponent,
    FoodRouletteComponent,
    ProfileComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    StepResultComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
