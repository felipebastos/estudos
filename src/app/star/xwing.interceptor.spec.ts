import { TestBed } from '@angular/core/testing';

import { XwingInterceptor } from './xwing.interceptor';

describe('XwingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      XwingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: XwingInterceptor = TestBed.inject(XwingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
