import { TestBed } from '@angular/core/testing';

import { PanelesService } from './paneles.service';

describe('PanelesService', () => {
    let service: PanelesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PanelesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
