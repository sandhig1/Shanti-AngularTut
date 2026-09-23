import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Doctorconsultancy } from './doctorconsultancy';

describe('Doctorconsultancy', () => {
  let component: Doctorconsultancy;
  let fixture: ComponentFixture<Doctorconsultancy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Doctorconsultancy],
    }).compileComponents();

    fixture = TestBed.createComponent(Doctorconsultancy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
