import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEditCardComponent } from './doctor-edit-card.component';

describe('DoctorEditCardComponent', () => {
  let component: DoctorEditCardComponent;
  let fixture: ComponentFixture<DoctorEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorEditCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
