import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() condicion:any;
  @Input() formName:string = "";
  @Input() nombreLabel:string = "";
  @Input() mensaje:string = "";
  @Input() formulario:any;
  @Input() tipoInput:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
