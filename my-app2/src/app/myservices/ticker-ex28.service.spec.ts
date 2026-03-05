import { TestBed } from '@angular/core/testing';

import { TickerEx28Service } from './ticker-ex28.service';

describe('TickerEx28Service', () => {
  let service: TickerEx28Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickerEx28Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
