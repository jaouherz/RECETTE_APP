import { TestBed } from '@angular/core/testing';

import { RoleguardGuard } from './roleguard.guard';

describe('RoleguardGuard', () => {
  let guard: RoleguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
