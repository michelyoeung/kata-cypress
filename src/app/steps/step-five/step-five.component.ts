import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {GOOGLE_API_KEY} from "../../../../env";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss']
})
export class StepFiveComponent implements OnInit {
  @Input() stepData = '';
  @Output() onNextStep = new EventEmitter<string>();
  apiLoaded: Observable<boolean>;

  constructor(private httpClient: HttpClient, private _api: ApiService) {
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {
    this._api.getLocation();
    console.log(this.stepData);
  }

  goNextStep(selected: string): void {
    this.onNextStep.emit(selected);
  }
}
