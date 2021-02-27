import { TestBed } from '@angular/core/testing';

import { GuardswithrolesGuard } from './guardswithroles.guard';

describe('GuardswithrolesGuard', () => {
  let guard: GuardswithrolesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardswithrolesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
