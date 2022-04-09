import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './common/input/input.component';
import { SelectAutocompleteComponent } from './common/select-autocomplete/select-autocomplete.component';
import { SelectAutocomplete2Component } from './common/select-autocomplete2/select-autocomplete2.component';
import { FormSearchComponent } from './components/form-search/form-search.component';
import { InfinityScrollComponent } from './components/infinity-scroll/infinity-scroll.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    InfinityScrollComponent,

    InputComponent,
    SelectAutocompleteComponent,
    FormSearchComponent,
    SelectAutocomplete2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
