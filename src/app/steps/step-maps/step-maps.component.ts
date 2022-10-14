import { Component, OnInit } from '@angular/core';
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
export class StepMapsComponent implements OnInit {
  apiLoaded: Observable<boolean>;

  constructor(private httpClient: HttpClient, private _api: ApiService) {
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {
  }

}
