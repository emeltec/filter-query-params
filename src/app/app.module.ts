import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfinityScrollComponent } from './components/infinity-scroll/infinity-scroll.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    InfinityScrollComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
