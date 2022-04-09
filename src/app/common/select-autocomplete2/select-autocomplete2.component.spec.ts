/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectAutocomplete2Component } from './select-autocomplete2.component';

describe('SelectAutocomplete2Component', () => {
  let component: SelectAutocomplete2Component;
  let fixture: ComponentFixture<SelectAutocomplete2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAutocomplete2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAutocomplete2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
