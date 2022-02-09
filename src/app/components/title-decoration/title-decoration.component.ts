import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-decoration',
  templateUrl: './title-decoration.component.html',
  styleUrls: ['./title-decoration.component.css']
})
export class TitleDecorationComponent implements OnInit {
  @Input() title:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
