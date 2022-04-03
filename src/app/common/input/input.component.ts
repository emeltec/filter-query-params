import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Output() message = new EventEmitter()

  constructor() { }

  ngOnInit() {

  }

  send() {
    console.log('Sendding')
    this.message.emit('Hola carajo!')
  }

}
