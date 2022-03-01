import { TestBed } from '@angular/core/testing';

import { MapBoxCustomService } from './map-box-custom.service';

describe('MapBoxCusomtService', () => {
  let service: MapBoxCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapBoxCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
