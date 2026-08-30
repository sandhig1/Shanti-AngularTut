import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Enquirydetail } from './enquirydetail';

describe('Enquirydetail', () => {
  let component: Enquirydetail;
  let fixture: ComponentFixture<Enquirydetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Enquirydetail],
    }).compileComponents();

    fixture = TestBed.createComponent(Enquirydetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
