import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, pluck, switchMap, tap } from 'rxjs';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-infinity-scroll',
  templateUrl: './infinity-scroll.component.html',
  styleUrls: ['./infinity-scroll.component.scss']
})
export class InfinityScrollComponent implements OnInit {
  @ViewChild('search', { static: true }) searchText!: ElementRef;

  showPanel=false;
  selector = ""
  count = 0;
  companies:any = []
  
  constructor(
    private http: HttpClient,
    private service: PaymentService
    ) { }

  ngOnInit() {
    // for(let i= 1; i<30; i++) {
    //   this.companies.push({
    //     name: 'Empresa '+i,
    //     serviceProviderId: 'C'+i
    //   });
    // }
    this.searchText.nativeElement.focus()
    setTimeout(() => {
      this.selector = '.list-company'
    }, 1000);

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
      this.companies = response; 
    })
  }

  onScroll() {
    console.log("scrolled!!");
 
    this.companies.push({
      name: 'Empresa '+this.count,
      serviceProviderId: 'D'+this.count
    });
    this.count += 1;
  }

  

  getPosts(name: any): Observable<any> {
    const URL = `http://localhost:3000/providers?name=${name}`;
    return this.http.get(URL);
  }

  selectItem(item:any) {
    console.log(item);
    this.showPanel = false;
    this.searchText.nativeElement.value = item.name
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
