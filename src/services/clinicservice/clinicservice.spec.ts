import { TestBed } from '@angular/core/testing';

import { Clinicservice } from './clinicservice';

describe('Clinicservice', () => {
  let service: Clinicservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clinicservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
