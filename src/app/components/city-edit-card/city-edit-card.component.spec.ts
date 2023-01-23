import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityEditCardComponent } from './city-edit-card.component';

describe('CityEditCardComponent', () => {
  let component: CityEditCardComponent;
  let fixture: ComponentFixture<CityEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityEditCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
