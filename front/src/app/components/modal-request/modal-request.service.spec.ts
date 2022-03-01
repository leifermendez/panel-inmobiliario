import { TestBed } from '@angular/core/testing';

import { ModalRequestService } from './modal-request.service';

describe('ModalRequestService', () => {
  let service: ModalRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
