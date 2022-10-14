import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodRouletteComponent } from './food-roulette/food-roulette.component';
@NgModule({
  declarations: [
    AppComponent,
    FoodRouletteComponent,
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
