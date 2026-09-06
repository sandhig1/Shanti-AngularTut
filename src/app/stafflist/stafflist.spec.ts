import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stafflist } from './stafflist';

describe('Stafflist', () => {
  let component: Stafflist;
  let fixture: ComponentFixture<Stafflist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stafflist],
    }).compileComponents();

    fixture = TestBed.createComponent(Stafflist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
