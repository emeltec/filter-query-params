import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IProvider } from 'src/app/interfaces/provider';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {

  providerSelected!: IProvider;
  formSearch!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildFormSearch();
  }

  buildFormSearch() {
    this.formSearch = new FormGroup({
      provider: new FormControl(),
      service: new FormControl(),
      clientCode: new FormControl()
    })
  }

  receiveProviderSelected(provider: IProvider) {
    console.log(provider)
    this.providerSelected = provider;
    this.formSearch.patchValue({provider:provider.name})
    this.getServices();
  }

  getServices() {
    console.log('Llamando servicios')
  }

}
