import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewenquiry } from './viewenquiry';

describe('Viewenquiry', () => {
  let component: Viewenquiry;
  let fixture: ComponentFixture<Viewenquiry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewenquiry],
    }).compileComponents();

    fixture = TestBed.createComponent(Viewenquiry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
