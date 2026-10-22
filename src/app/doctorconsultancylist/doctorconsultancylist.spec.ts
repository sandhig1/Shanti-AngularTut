import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Doctorconsultancylist } from './doctorconsultancylist';

describe('Doctorconsultancylist', () => {
  let component: Doctorconsultancylist;
  let fixture: ComponentFixture<Doctorconsultancylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Doctorconsultancylist],
    }).compileComponents();

    fixture = TestBed.createComponent(Doctorconsultancylist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
