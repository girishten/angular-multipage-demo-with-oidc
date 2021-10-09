import { TestBed } from '@angular/core/testing';

import { ExtendedOAuthService } from './extended-oauth.service';

describe('ExtendedOAuthService', () => {
  let service: ExtendedOAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtendedOAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
