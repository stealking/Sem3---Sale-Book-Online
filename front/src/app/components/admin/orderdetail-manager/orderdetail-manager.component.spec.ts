/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrderdetailManagerComponent } from './orderdetail-manager.component';

describe('OrderdetailManagerComponent', () => {
  let component: OrderdetailManagerComponent;
  let fixture: ComponentFixture<OrderdetailManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderdetailManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdetailManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
