import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cliniclist } from './cliniclist';

describe('Cliniclist', () => {
  let component: Cliniclist;
  let fixture: ComponentFixture<Cliniclist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cliniclist],
    }).compileComponents();

    fixture = TestBed.createComponent(Cliniclist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
