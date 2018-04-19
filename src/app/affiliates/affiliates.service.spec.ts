import { TestBed, inject } from '@angular/core/testing';

import { AffiliatesService } from './affiliates.service';

describe('AffiliatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AffiliatesService]
    });
  });

  it('should be created', inject([AffiliatesService], (service: AffiliatesService) => {
    expect(service).toBeTruthy();
  }));
});
