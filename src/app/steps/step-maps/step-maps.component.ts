import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { GOOGLE_API_KEY } from "../../../../env";
import { ApiService } from "../../api.service";

@Component({
  selector: 'app-step-maps',
  templateUrl: './step-maps.component.html',
  styleUrls: ['./step-maps.component.scss']
})
export class StepMapsComponent implements OnInit, OnChanges {
  @Input() resultingRestaurant: any = null;
  apiLoaded: Observable<boolean>;

  markerPosition: any;

  @ViewChild('map') map!: ElementRef<HTMLElement>;

  constructor(private httpClient: HttpClient, private _api: ApiService) {
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {
    console.log('[TEST] resultingRestaurant : ', this.resultingRestaurant);
  }

  ngOnChanges() {
    if (this.resultingRestaurant.geometry) {
      this.markerPosition = {lat: this.resultingRestaurant.geometry.location.lat, lng: this.resultingRestaurant.geometry.location.lng}
      console.log(this.markerPosition);
    }
  }
}
