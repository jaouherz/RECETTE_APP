import { TestBed } from '@angular/core/testing';

import { OrgaroleGuard } from './orgarole.guard';

describe('OrgaroleGuard', () => {
  let guard: OrgaroleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrgaroleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
