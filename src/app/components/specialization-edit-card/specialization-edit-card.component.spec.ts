import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationEditCardComponent } from './specialization-edit-card.component';

describe('SpecializationEditCardComponent', () => {
  let component: SpecializationEditCardComponent;
  let fixture: ComponentFixture<SpecializationEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecializationEditCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializationEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
