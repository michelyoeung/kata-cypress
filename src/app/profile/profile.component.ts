import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  static LOCAL_STORAGE_ITEM_PREFIX = 'BOUFFE_ROULETTE_';

  @Output() onLoading = new EventEmitter<boolean>();

  isLoading = false;
  hasErrorInName = false;
  hasErrorInAge = false;

  profileForm = this._formBuilder.group({
    name: '',
    age: '',
  });

  private _destroyed$ = new Subject<void>();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _apiService: ApiService,
  ) {}

  ngOnInit() {
    this.profileForm
      .get('name')
      ?.valueChanges.pipe(takeUntil(this._destroyed$))
      .subscribe((value) => {
        this.hasErrorInName = this._hasErrorInName(value?.toString() || '');
      });
    this.profileForm
      .get('age')
      ?.valueChanges.pipe(takeUntil(this._destroyed$))
      .subscribe((value) => {
        this.hasErrorInAge = this._hasErrorInAge(value?.toString() || '');
      });
  }

  private _hasErrorInName(value: string): boolean {
    return !value?.length;
  }

  private _hasErrorInAge(value: string): boolean {
    const valueInt = parseInt(value || '', 10);
    return (this.hasErrorInAge = isNaN(valueInt) || valueInt < 0);
  }

  private _refreshFormErrors(): void {
    this.hasErrorInName = this._hasErrorInName(this.profileForm.get('name')?.value?.toString() || '');
    this.hasErrorInAge = this._hasErrorInAge(this.profileForm.get('age')?.value?.toString() || '');
  }

  ngOnDestroy() {
    this._destroyed$.next();
  }

  get hasErrorInForm(): boolean {
    return this.hasErrorInName || this.hasErrorInAge;
  }

  onSubmit(): void {
    if (this.isLoading) {
      return;
    }
    this._refreshFormErrors();
    if (this.hasErrorInForm) {
      return;
    }
    this._toastrService.info('Saving your infos...', 'Information', { timeOut: 2000 });
    this.isLoading = true;
    this.onLoading.emit(true);
    this._apiService
      .saveProfileInfos(
        this.profileForm.get('name')?.value?.toString() || '',
        this.profileForm.get('age')?.value?.toString() || '',
      )
      .subscribe(() => {
        this._toastrService.success('Your infos have been successfully saved !', 'Success', { timeOut: 2000 });
        this.isLoading = false;
        this.onLoading.emit(false);
      });
  }
}
