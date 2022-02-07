import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title:any;
  @Input() mensaje:any;
  @Input() condicion:any;
  @Output() seAcepto:EventEmitter<any> = new EventEmitter<any>();
  @Output() seRechazo:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  aceptar(){
    this.seAcepto.emit();
  }

  rechazar(){
    this.seRechazo.emit();
  }
  
}
