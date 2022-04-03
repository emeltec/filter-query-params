import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, pluck, switchMap, tap } from 'rxjs';
import { IProvider } from 'src/app/interfaces/provider';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-select-autocomplete',
  templateUrl: './select-autocomplete.component.html',
  styleUrls: ['./select-autocomplete.component.scss']
})
export class SelectAutocompleteComponent implements OnInit {
  @ViewChild('search', { static: true }) searchText!: ElementRef;
  @Output() emitProviderSelected = new EventEmitter();

  showPanel=false;
  count = 0;
  providers: IProvider[] = []

  constructor(
    private http: HttpClient,
    private service: PaymentService
  ) { }

  ngOnInit() {
    const keyUp$ = fromEvent(this.searchText.nativeElement, 'keyup');
    keyUp$.pipe(
      tap(e => console.log(e)),
      pluck('target', 'value'),
      filter((text:any) => text.length > 1),
      map((text:string) => text.toUpperCase()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(text => this.service.getCompanies(text))
    ).subscribe((response:any[]) => {
      console.log(response);
      this.providers = response; 
    })
  }

  onScroll() {
    console.log("scrolled!!");
 
    this.providers.push({
      name: 'Empresa '+this.count,
      serviceProviderId: 'D'+this.count
    });
    this.count += 1;
  }

  

  getPosts(name: any): Observable<any> {
    const URL = `http://localhost:3000/providers?name=${name}`;
    return this.http.get(URL);
  }

  selectProvider(provider: IProvider) {
    this.showPanel = false;
    this.searchText.nativeElement.value = provider.name;
    this.emitProviderSelected.emit(provider)
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
