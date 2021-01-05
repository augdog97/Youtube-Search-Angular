import { TestBed } from '@angular/core/testing';

import { YoutubesearchService } from './youtubesearch.service';

describe('YoutubesearchService', () => {
  let service: YoutubesearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubesearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
