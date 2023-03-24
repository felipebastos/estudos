import { TestBed } from '@angular/core/testing';

import { ApihoraService } from './apihora.service';

describe('ApihoraService', () => {
  let service: ApihoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApihoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
