import { TestBed } from '@angular/core/testing';

import { StartedService } from './started.service';

describe('StartedService', () => {
  let service: StartedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
