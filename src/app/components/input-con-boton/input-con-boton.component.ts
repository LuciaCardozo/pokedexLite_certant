import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AddEditComponent } from '../add-edit/add-edit.component';

@Component({
  selector: 'app-input-con-boton',
  templateUrl: './input-con-boton.component.html',
  styleUrls: ['./input-con-boton.component.css']
})
export class InputConBotonComponent implements OnInit {
  @Input() titulo:string = "";
  @Input() nombreBoton:string = "";
  @Input() tipoInput:string = "";
  @Input() subTitulo:string = "";
  variableInput:string = "";
  @Output() seAcepto:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  aceptar(){
    this.seAcepto.emit(this.variableInput);
    this.variableInput = "";
  }
}
