import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectAutocompleteComponent } from 'src/app/common/select-autocomplete/select-autocomplete.component';
import { MessageDefault, MessageError } from 'src/app/config/form.message';
import { IProvider } from 'src/app/interfaces/provider';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {
  @ViewChild(SelectAutocompleteComponent) selectAutocomplete!: SelectAutocompleteComponent;

  stateCompany: string = '';
  messageCompany: string = MessageDefault.COMPANY_TO_PAY;
  providerSelected!: IProvider;
  formSearch!: FormGroup;

  constructor() { }

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

  listenSelectedProvider(provider: IProvider) {
    console.log(provider)
    this.providerSelected = provider;
    this.formSearch.patchValue({provider: provider.name});
    if(provider.serviceProviderId !== null) {
      this.getServices();
    }
  }

  listenStateCompany(state: string) {
    this.stateCompany = state;
    console.log('Listen State: ', state);
  }

  getServices() {
    console.log('Llamando servicios')
  }

  sendForm() {
    console.log(this.formSearch.controls['provider'].value);
    console.log('State', this.stateCompany);

    if(this.formSearch.controls['provider'].value === null) {
      this.stateCompany = 'error';
      this.messageCompany = MessageError.COMPANY_EMPTY;
    } else {
      this.stateCompany = '';
      this.messageCompany = MessageDefault.COMPANY_TO_PAY;
    }
    
  }

  resetForm() {
    this.formSearch.reset();
    this.selectAutocomplete.resetInput();
  }

}
