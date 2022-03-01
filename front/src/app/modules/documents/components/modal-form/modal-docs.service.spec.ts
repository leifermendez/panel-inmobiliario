import { TestBed } from '@angular/core/testing';

import { ModalDocsService } from './modal-docs.service';

describe('ModalDocsService', () => {
  let service: ModalDocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalDocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
