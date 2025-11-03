import { TestBed } from '@angular/core/testing';

import { InversoresService } from './inversores.service';

describe('InversoresService', () => {
    let service: InversoresService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(InversoresService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
