import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statedetail } from './statedetail';

describe('Statedetail', () => {
  let component: Statedetail;
  let fixture: ComponentFixture<Statedetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statedetail],
    }).compileComponents();

    fixture = TestBed.createComponent(Statedetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
