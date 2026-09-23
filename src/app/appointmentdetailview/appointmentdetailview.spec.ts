import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Appointmentdetailview } from './appointmentdetailview';

describe('Appointmentsfordoctordetail', () => {
  let component: Appointmentdetailview;
  let fixture: ComponentFixture<Appointmentdetailview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Appointmentdetailview],
    }).compileComponents();

    fixture = TestBed.createComponent(Appointmentdetailview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
