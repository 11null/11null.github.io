import { TestBed } from '@angular/core/testing';

import { ModStatusManagerService } from './mod-status-manager.service';

describe('ModStatusManagerService', () => {
  let service: ModStatusManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModStatusManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
