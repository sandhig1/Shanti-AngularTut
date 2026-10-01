import { TestBed } from '@angular/core/testing';

import { Doctorconsultancyservice } from './doctorconsultancyservice';

describe('Doctorconsultancyservice', () => {
  let service: Doctorconsultancyservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Doctorconsultancyservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
