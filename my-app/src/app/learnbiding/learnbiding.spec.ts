import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Learnbiding } from './learnbiding';

describe('Learnbiding', () => {
  let component: Learnbiding;
  let fixture: ComponentFixture<Learnbiding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Learnbiding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Learnbiding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
