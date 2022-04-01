/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InfinityScrollComponent } from './infinity-scroll.component';

describe('InfinityScrollComponent', () => {
  let component: InfinityScrollComponent;
  let fixture: ComponentFixture<InfinityScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfinityScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinityScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
