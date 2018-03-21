import { TestBed, inject } from '@angular/core/testing';

import { OptionConverterService } from './option-converter.service';

describe('OptionConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptionConverterService]
    });
  });

  it('should be created', inject([OptionConverterService], (service: OptionConverterService) => {
    expect(service).toBeTruthy();
  }));
});
