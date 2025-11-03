import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InversoresComponent } from './inversores.component';

describe('InversoresComponent', () => {
  let component: InversoresComponent;
  let fixture: ComponentFixture<InversoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InversoresComponent]
    });
    fixture = TestBed.createComponent(InversoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
