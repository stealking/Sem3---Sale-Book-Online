/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserListFormComponent } from './user-list-form.component';

describe('UserListFormComponent', () => {
  let component: UserListFormComponent;
  let fixture: ComponentFixture<UserListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
