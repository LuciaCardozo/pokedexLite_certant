import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title:string = "";
  @Input() message:string = "";
  @Input() condition:any;
  @Output() agree:EventEmitter<any> = new EventEmitter<any>();
  @Output() rejection:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  accept(){
    this.agree.emit();
  }

  refuse(){
    this.rejection.emit();
  }
  
}
