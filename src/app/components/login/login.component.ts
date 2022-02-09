import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = {
    username: '',
    password: ''
  };

  constructor(private database: ApiPokemonService, private router: Router, private toastService: ToastService) { }

  ngOnInit() { }

  loginConValidacion() {
    if(this.usuario.username == "" && this.usuario.password == "") {
      this.toastService.show("Por favor llene los campos", {classname:'bg-warning', "delay":"1000"});
    } else {
      this.database.getSwaggerCliente(this.usuario).subscribe({
        next: (res) => {
          this.database.userId = res.userId;
          this.database.emailUsuarioLogeado = res.username;
          this.router.navigate(['/home']);
          this.toastService.show("Bienvenid@", {classname:'bg-success', "delay":"1500"});
        },
        error: () => {
          this.toastService.show("El usuario no existe en la base de datos", {classname:'bg-danger', "delay":"1500"});
        }
      });
    }
  }
  
  autoCompletarUsuario(username:string,password:string) {
    this.usuario = {
      username:username,
      password:password,
    }
  }

}
