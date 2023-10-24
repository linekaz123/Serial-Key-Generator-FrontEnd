import { TestBed } from '@angular/core/testing';

import { SerialSetService } from './serial-set.service';

describe('SerialSetService', () => {
  let service: SerialSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerialSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
