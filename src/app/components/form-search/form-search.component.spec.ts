/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { FormSearchComponent } from './form-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectAutocompleteComponent } from 'src/app/common/select-autocomplete/select-autocomplete.component';

describe('FormSearchComponent', () => {
  
  let component: FormSearchComponent;
  let fixture: ComponentFixture<FormSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [ 
        FormSearchComponent, 
        SelectAutocompleteComponent 
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#resetForm()', () => {
    component.resetForm();
    expect(component.formSearch.reset).toBeTruthy();
    expect(component.selectAutocomplete.resetInput).toBeTruthy();
  });
});
