import { TestBed } from '@angular/core/testing';

import { OrgaonlyGuard } from './orgaonly.guard';

describe('OrgaonlyGuard', () => {
  let guard: OrgaonlyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrgaonlyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
