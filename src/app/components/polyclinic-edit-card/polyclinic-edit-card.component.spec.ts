import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyclinicEditCardComponent } from './polyclinic-edit-card.component';

describe('PolyclinicEditCardComponent', () => {
  let component: PolyclinicEditCardComponent;
  let fixture: ComponentFixture<PolyclinicEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolyclinicEditCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolyclinicEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
