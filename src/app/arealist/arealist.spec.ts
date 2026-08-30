import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Arealist } from './arealist';

describe('Arealist', () => {
  let component: Arealist;
  let fixture: ComponentFixture<Arealist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Arealist],
    }).compileComponents();

    fixture = TestBed.createComponent(Arealist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
