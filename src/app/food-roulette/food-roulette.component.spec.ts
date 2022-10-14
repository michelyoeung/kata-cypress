import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodRouletteComponent } from './food-roulette.component';

describe('FoodRouletteComponent', () => {
  let component: FoodRouletteComponent;
  let fixture: ComponentFixture<FoodRouletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodRouletteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodRouletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
