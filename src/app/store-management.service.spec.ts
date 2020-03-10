/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StoreManagementService } from './store-management.service';

describe('Service: StoreManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreManagementService]
    });
  });

  it('should ...', inject([StoreManagementService], (service: StoreManagementService) => {
    expect(service).toBeTruthy();
  }));
});
