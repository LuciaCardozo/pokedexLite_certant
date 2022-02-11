import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AddEditComponent } from '../add-edit/add-edit.component';

@Component({
  selector: 'app-input-con-boton',
  templateUrl: './input-con-boton.component.html',
  styleUrls: ['./input-con-boton.component.css']
})
export class InputConBotonComponent implements OnInit {
  @Input() title:string = "";
  @Input() nameButton:string = "";
  @Input() inputType:string = "";
  @Input() subTitle:string = "";
  inputValue:string = "";
  @Output() agree:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  accept(){
    this.agree.emit(this.inputValue);
    this.inputValue = "";
  }
}
