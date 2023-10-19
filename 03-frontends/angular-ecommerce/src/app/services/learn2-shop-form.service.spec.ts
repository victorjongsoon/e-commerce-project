import { TestBed } from '@angular/core/testing';

import { Learn2ShopFormService } from './learn2-shop-form.service';

describe('Learn2ShopFormService', () => {
  let service: Learn2ShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Learn2ShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
