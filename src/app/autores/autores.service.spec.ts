/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutoresService } from './autores.service';

describe('Service: Autores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoresService]
    });
  });

  it('should ...', inject([AutoresService], (service: AutoresService) => {
    expect(service).toBeTruthy();
  }));
});
