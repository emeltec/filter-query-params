import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, pluck, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild('search', { static: true }) searchText!: ElementRef;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // const inputText = document.getElementById('search');
    // const keyUp$ = fromEvent(inputText, 'keyup')

    const keyUp$ = fromEvent(this.searchText.nativeElement, 'keyup');
    keyUp$.pipe(
      tap(e => console.log(e)),
      pluck('target', 'value'),
      filter((text:any) => text.length > 1),
      map((text:string) => text.toUpperCase()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(text => this.getPosts(text))
    ).subscribe(x => {
      console.log(x)
    })
  }

  getPosts(text: any): Observable<any> {
    const URL = `https://es.wikipedia.org/w/api.php?search=${text}&action=opensearch&origin=*`;
    return this.http.get(URL);
  }

}
