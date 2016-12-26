/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BookMultiqueryService } from './book-multiquery.service';

describe('BookMultiqueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookMultiqueryService]
    });
  });

  it('should ...', inject([BookMultiqueryService], (service: BookMultiqueryService) => {
    expect(service).toBeTruthy();
  }));
});
