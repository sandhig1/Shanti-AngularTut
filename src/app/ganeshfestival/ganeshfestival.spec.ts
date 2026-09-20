import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ganeshfestival } from './ganeshfestival';

describe('Ganeshfestival', () => {
  let component: Ganeshfestival;
  let fixture: ComponentFixture<Ganeshfestival>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ganeshfestival],
    }).compileComponents();

    fixture = TestBed.createComponent(Ganeshfestival);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
