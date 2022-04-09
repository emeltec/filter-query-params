import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, pluck, switchMap, tap } from 'rxjs';
import { IProvider, IProviderResponse } from 'src/app/interfaces/provider';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-infinity-scroll',
  templateUrl: './infinity-scroll.component.html',
  styleUrls: ['./infinity-scroll.component.scss']
})
export class InfinityScrollComponent implements OnInit {
  @ViewChild('search', { static: true }) searchText!: ElementRef;

  showPanel = false;
  selector = ".list-company"
  counterPage = 0;
  totalPages = 0;
  providers: IProvider[] = []
  
  constructor(
    private http: HttpClient,
    private service: PaymentService
    ) { }

  ngOnInit() {
    this.searchText.nativeElement.focus();
  
    const keyUp$ = fromEvent(this.searchText.nativeElement, 'keyup');
    keyUp$.pipe(
      tap(e => {
        console.log(e);
        this.counterPage = 0;
      }),
      pluck('target', 'value'),
      filter((text:any) => text.length > 1),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(text => this.service.getCompanies(text))
    ).subscribe((response:IProviderResponse) => {
      console.log(response);
      this.providers = response.companies; 
      this.totalPages = response.totalPages;
    })
  }

  onScroll() {
    const currentValue = this.searchText.nativeElement.value;
    this.counterPage += 1;

    if(this.counterPage <= this.totalPages){
      this.service.getCompanies(currentValue, this.counterPage).subscribe(response => {
        this.providers.push(...response.companies);
      })
    }
  }

  selectItem(provider:IProvider) {
    console.log(provider);
    this.showPanel = false;
    this.searchText.nativeElement.value = provider.name
  }

  onFocus(){
    console.log('focus')
    this.showPanel = true
  }

  onBlur(){
    console.log('Blur')
    setTimeout(() => {
      this.showPanel = false;
    }, 300);
  }

}
