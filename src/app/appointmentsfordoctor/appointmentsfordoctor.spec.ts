import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsForDoctor } from './appointmentsfordoctor';

describe('appointmentsfordoctor', () => {
  let component: AppointmentsForDoctor;
  let fixture: ComponentFixture<AppointmentsForDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsForDoctor],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentsForDoctor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
