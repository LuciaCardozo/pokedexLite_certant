import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() condition:any;
  @Input() formName:string = "";
  @Input() nameLabel:string = "";
  @Input() message:string = "";
  @Input() form:any;
  @Input() inputType:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
