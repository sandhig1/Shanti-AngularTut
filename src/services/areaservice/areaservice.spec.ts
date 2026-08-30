import { TestBed } from '@angular/core/testing';

import { Areaservice } from './areaservice';

describe('Areaservice', () => {
  let service: Areaservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Areaservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
