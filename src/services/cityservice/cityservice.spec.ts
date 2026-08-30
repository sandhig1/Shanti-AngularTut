import { TestBed } from '@angular/core/testing';

import { Cityservice } from './cityservice';

describe('Cityservice', () => {
  let service: Cityservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cityservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
