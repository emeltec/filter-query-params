import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, tap } from 'rxjs';
import { MessageDefault, MessageError } from 'src/app/config/form.message';
import { IProvider, IProviderResponse } from 'src/app/interfaces/provider';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-select-autocomplete2',
  templateUrl: './select-autocomplete2.component.html',
  styleUrls: ['./select-autocomplete2.component.scss']
})
export class SelectAutocomplete2Component implements OnInit {
  @Output() emitSelectedProvider = new EventEmitter();
  @Output() emitStateCompany = new EventEmitter();
  @Input() stateCompany: string = '';
  @Input() messageCompany: string = '';

  formSearch: FormGroup;
  showPanel = false;
  counterPage = 0;
  totalPages = 0;
  providers: IProvider[] = [];

  constructor(
    private http: HttpClient,
    private service: PaymentService
  ) {
    this.formSearch = new FormGroup({
      search: new FormControl()
    })
  }


  ngOnInit() {
    this.formSearch.controls['search'].valueChanges.pipe(
      tap(e => {
        this.counterPage = 0;
      }),
      filter((text: string) => text.length > 1),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(text => this.service.getCompanies(text, this.counterPage))
    ).subscribe(response => {
      console.log(response);
      this.providers = response.companies;
      this.totalPages = response.totalPages;
      this.validateCompany();
    })

    // fromEvent(document, 'click')
    //   .pipe(
    //     take(1)
    //   ).subscribe(() => this.hasNotClicked = false);

    // const keyUp$ = fromEvent(this.searchText.nativeElement, 'keyup');
    // keyUp$.pipe(
    //   tap(e => {
    //     console.log(e);
    //     this.counterPage = 0;
    //   }),
    //   pluck('target', 'value'),
    //   filter((text:any) => text.length > 1),
    //   debounceTime(500),
    //   distinctUntilChanged(),
    //   switchMap(text => this.service.getCompanies(text, this.counterPage))
    // ).subscribe((response:IProviderResponse) => {
    //   console.log(response);
    //   this.providers = response.companies;
    //   this.totalPages = response.totalPages;
    //   this.validateCompany();
    // })

  }

  onScroll() {
    const currentValue = this.formSearch.value.search;
    this.counterPage += 1;

    if (this.counterPage <= this.totalPages) {
      this.service.getCompanies(currentValue, this.counterPage).subscribe(response => {
        this.providers.push(...response.companies)
      })
    }
  }

  selectProvider(provider: IProvider) {
    console.log(provider);
    this.formSearch.controls['search'].setValue(provider.name)
    this.emitSelectedProvider.emit(provider);
    this.emitStateCompany.emit('');
    this.messageCompany = MessageDefault.COMPANY_TO_PAY;
    this.showPanel = false;
  }

  onFocus() {
    this.showPanel = true;
  }

  onBlur() {
    setTimeout(() => {
      this.showPanel = false;
    }, 250);
  }

  validateCompany() {
    this.emitSelectedProvider.emit({
      name: null,
      serviceProviderId: null
    });
    if (this.providers.length === 0) {
      this.stateCompany = 'error';
      this.messageCompany = MessageError.COMPANY_NOT_FOUND
      this.emitStateCompany.emit(this.stateCompany);

    } else {
      this.stateCompany = '';
      this.messageCompany = MessageDefault.COMPANY_TO_PAY;
      this.emitStateCompany.emit(this.stateCompany);
    }
  }

  change(event: any) {
    console.log('CHANGE', event.target.value)
    if (event.target.value.length < 2) {
      this.stateCompany = 'error';
      this.messageCompany = MessageError.COMPANY_EMPTY;
      this.emitStateCompany.emit(this.stateCompany);
    }
  }

}
