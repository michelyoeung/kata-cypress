import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleStepsComponent } from './circle-steps.component';

describe('CircleStepsComponent', () => {
  let component: CircleStepsComponent;
  let fixture: ComponentFixture<CircleStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircleStepsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
