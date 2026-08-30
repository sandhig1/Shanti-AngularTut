import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Controlflow } from './controlflow';

describe('Controlflow', () => {
  let component: Controlflow;
  let fixture: ComponentFixture<Controlflow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Controlflow],
    }).compileComponents();

    fixture = TestBed.createComponent(Controlflow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
