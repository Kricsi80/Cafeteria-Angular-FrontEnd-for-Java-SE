import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRiportComponent } from './employee-riport.component';

describe('EmployeeRiportComponent', () => {
  let component: EmployeeRiportComponent;
  let fixture: ComponentFixture<EmployeeRiportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRiportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRiportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
