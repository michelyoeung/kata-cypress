import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepResultComponent } from './step-maps.component';

describe('StepMapsComponent', () => {
  let component: StepResultComponent;
  let fixture: ComponentFixture<StepResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
