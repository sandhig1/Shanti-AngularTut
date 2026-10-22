import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConsultancy } from './doctorconsultancy';

describe('DoctorConsultancy', () => {
  let component: DoctorConsultancy;
  let fixture: ComponentFixture<DoctorConsultancy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorConsultancy],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorConsultancy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
