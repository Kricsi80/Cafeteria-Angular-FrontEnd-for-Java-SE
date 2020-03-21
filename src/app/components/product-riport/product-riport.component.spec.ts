import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRiportComponent } from './product-riport.component';

describe('ProductRiportComponent', () => {
  let component: ProductRiportComponent;
  let fixture: ComponentFixture<ProductRiportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRiportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRiportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
