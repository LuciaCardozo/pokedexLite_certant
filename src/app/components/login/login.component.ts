import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';
import { Client } from 'src/app/class/client';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:Client = new Client;

  constructor(private apiPokemon: ApiPokemonService, private router: Router, private toastService: ToastService) { }

  ngOnInit() { }

  loginWithValidation() {
    if(this.user.username == "" && this.user.password == "") {
      this.toastService.show("Por favor llene los campos", {classname:'bg-warning', "delay":"1000"});
    } else {
      this.apiPokemon.getSwaggerCliente(this.user).subscribe({
        next: (res) => {
          this.apiPokemon.userIdRegistered = Number(res.userId);
          this.router.navigate(['/home']);
          this.toastService.show("Bienvenid@ "+res.username, {classname:'bg-success', "delay":"1500"});
        },
        error: () => {
          this.toastService.show("El usuario no existe en la base de datos", {classname:'bg-danger', "delay":"1500"});
        }
      });
    }
  }
  
  userAutocomplete(username:string,password:string) {
    this.user.username = username;
    this.user.password = password
  }

}
