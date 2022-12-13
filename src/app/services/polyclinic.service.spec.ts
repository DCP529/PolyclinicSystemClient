import { TestBed } from '@angular/core/testing';

import { PolyclinicService } from './polyclinic.service';

describe('PolyclinicService', () => {
  let service: PolyclinicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolyclinicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
