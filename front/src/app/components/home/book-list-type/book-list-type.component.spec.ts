/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookListTypeComponent } from './book-list-type.component';

describe('BookListTypeComponent', () => {
  let component: BookListTypeComponent;
  let fixture: ComponentFixture<BookListTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
