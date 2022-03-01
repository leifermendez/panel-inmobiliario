import { TestBed } from '@angular/core/testing';

import { HistoryPaginateService } from './history-paginate.service';

describe('HistoryPaginateService', () => {
  let service: HistoryPaginateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryPaginateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
