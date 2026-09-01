import { TestBed } from '@angular/core/testing';

import { Doctorservice } from './doctorservice';

describe('Doctorservice', () => {
  let service: Doctorservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Doctorservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
