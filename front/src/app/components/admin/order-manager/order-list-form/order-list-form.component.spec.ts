/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrderListFormComponent } from './order-list-form.component';

describe('OrderListFormComponent', () => {
  let component: OrderListFormComponent;
  let fixture: ComponentFixture<OrderListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});