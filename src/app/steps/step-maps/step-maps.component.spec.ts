import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepMapsComponent } from './step-maps.component';

describe('StepMapsComponent', () => {
  let component: StepMapsComponent;
  let fixture: ComponentFixture<StepMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepMapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
