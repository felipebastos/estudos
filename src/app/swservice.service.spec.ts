import { TestBed } from '@angular/core/testing';

import { SwserviceService } from './swservice.service';

describe('SwserviceService', () => {
  let service: SwserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
