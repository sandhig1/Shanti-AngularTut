import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Doctorlist } from './doctorlist';

describe('Doctorlist', () => {
  let component: Doctorlist;
  let fixture: ComponentFixture<Doctorlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Doctorlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Doctorlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
