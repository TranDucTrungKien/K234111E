import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newbook } from './newbook';

describe('Newbook', () => {
  let component: Newbook;
  let fixture: ComponentFixture<Newbook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Newbook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newbook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
