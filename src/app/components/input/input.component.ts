import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() condicion:any;
  @Input() formName:any;
  @Input() nombreLabel:any;
  @Input() mensaje:any;
  @Input() formulario:any;
  @Input() tipoInput:any;
  constructor() { }

  ngOnInit(): void {
  }

}
