import { TestBed } from '@angular/core/testing';

import { Doctorpatientappointmentservice } from './doctorpatientappointmentservice';

describe('Doctorpatientappointmentservice', () => {
  let service: Doctorpatientappointmentservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Doctorpatientappointmentservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
