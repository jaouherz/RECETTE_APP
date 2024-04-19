import { TestBed } from '@angular/core/testing';

import { RecetteGuard } from './recette.guard';

describe('RecetteGuard', () => {
  let guard: RecetteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecetteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
