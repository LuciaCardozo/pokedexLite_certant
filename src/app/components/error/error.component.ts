import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private router:Router, private toastService:ToastService) { }

  ngOnInit(): void {
    this.toastService.show("La URL no existe, te redireccionaremos a la pagina login", {classname:'bg-warning', "delay":"5000"});
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 6000);
  }

}
