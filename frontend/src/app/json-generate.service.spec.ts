import { TestBed } from '@angular/core/testing';

import { JsonGenerateService } from './json-generate.service';

describe('JsonGenerateService', () => {
  let service: JsonGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
