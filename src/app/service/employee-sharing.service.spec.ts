import { TestBed } from '@angular/core/testing';

import { EmployeeSharingService } from './employee-sharing.service';

describe('EmployeeSharingService', () => {
  let service: EmployeeSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
