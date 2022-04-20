import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, pluck, switchMap, tap } from 'rxjs';
import { MessageDefault, MessageError } from 'src/app/config/form.message';
import { IProvider, IProviderResponse } from 'src/app/interfaces/provider';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-select-autocomplete',
  templateUrl: './select-autocomplete.component.html',
  styleUrls: ['./select-autocomplete.component.scss']
})
export class SelectAutocompleteComponent implements OnInit {
  @ViewChild('search', { static: true }) searchText!: ElementRef;
  @Output() emitSelectedProvider = new EventEmitter();
  @Output() emitStateCompany = new EventEmitter();
  @Input() stateCompany: string = '';
  @Input() messageCompany: string = '';
  regexCode = new RegExp(/^[.0-9a-zA-ZŸÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÒÓÔÕÖ×ØÙÚÛÜÝàáâãäåæçèéêëìíîïòóôõöùúûüýÿÑñáéíóúÁÉÍÓÚ´‘-\s]*$/);

  showPanel=false;
  counterPage = 0;
  totalPages = 0;
  providers: IProvider[] = []

  constructor(
    private http: HttpClient,
    private service: PaymentService
  ) { }

  ngOnInit() {
    const keyUp$ = fromEvent(this.searchText.nativeElement, 'keyup');
    keyUp$.pipe(
      tap(event => {
        this.counterPage = 0;
      }),
      pluck('target', 'value'),
      map((text:any) => {
        return text.trim().replace(/(\s{2,})/g, ' ');
      }),
      filter((text:string) => text.length > 1),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(text => this.service.getCompanies(text, this.counterPage))
    ).subscribe((response:IProviderResponse) => {
      console.log(response);
      this.providers = response.companies;
      this.totalPages = response.totalPages;
      this.validateCompany();
    })

  }

  onScroll() {
    const currentValue = this.searchText.nativeElement.value;
    this.counterPage += 1;

    if(this.counterPage <= this.totalPages){
      this.service.getCompanies(currentValue, this.counterPage).subscribe(response => {
        this.providers.push(...response.companies)
      })
    }
  }

  selectProvider(provider: IProvider) {
    this.searchText.nativeElement.value = provider.name;
    this.emitSelectedProvider.emit(provider);
    this.emitStateCompany.emit('');
    this.messageCompany = MessageDefault.COMPANY_TO_PAY;
    this.showPanel = false;
  }

  onFocus(){
    this.showPanel = true;
  }

  onBlur(){
    setTimeout(() => {
      this.showPanel = false;
    }, 250);
  }

  validateCompany() {
    this.emitSelectedProvider.emit({ name: null, serviceProviderId: null });
    
    if(this.providers.length === 0) {
      this.stateCompany = 'error';
      this.messageCompany = MessageError.COMPANY_NOT_FOUND
      this.emitStateCompany.emit(this.stateCompany);
    } else {
      this.stateCompany = '';
      this.messageCompany = MessageDefault.COMPANY_TO_PAY;
      this.emitStateCompany.emit(this.stateCompany);
    }
  }

  change(event:any){
    console.log('CHANGE', event.target.value)
    if(event.target.value.length < 2) {
      this.stateCompany = 'error';
      this.messageCompany = MessageError.COMPANY_EMPTY;
      this.emitStateCompany.emit(this.stateCompany);
    }
  }

  onKeyPress(event:any):boolean | any {
    if(event.keyCode === 180) {
      return false;
    }
    if(!this.regexCode.test(event.key)) {
      console.log('Key Invalid');
      return false;
    }
    const value = event.target.value;
  }

}
