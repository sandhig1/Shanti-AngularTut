import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewstate } from './viewstate';

describe('Viewstate', () => {
  let component: Viewstate;
  let fixture: ComponentFixture<Viewstate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewstate],
    }).compileComponents();

    fixture = TestBed.createComponent(Viewstate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
