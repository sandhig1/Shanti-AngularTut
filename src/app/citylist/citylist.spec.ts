import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Citylist } from './citylist';

describe('Citylist', () => {
  let component: Citylist;
  let fixture: ComponentFixture<Citylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Citylist],
    }).compileComponents();

    fixture = TestBed.createComponent(Citylist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
