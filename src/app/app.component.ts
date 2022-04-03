import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IProvider } from './interfaces/provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Filter query params app';

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

  }

  recibeMenssge(msg:string) {
    this.title = msg;
  }
  
}
