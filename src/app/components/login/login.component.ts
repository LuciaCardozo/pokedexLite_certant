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
  isLogged = false;

  constructor(private database: ApiPokemonService, private router: Router, private toastService: ToastService) { }

  ngOnInit() { }

   loginConValidacion() {
      try{
        if(this.usuario.username == "" && this.usuario.password == ""){
          this.toastService.show("Por favor llene los campos", {classname:'bg-warning', "delay":"1500"});
        } else {
          this.database.getSwaggerCliente(this.usuario).subscribe((res)=>{ 
            this.database.userId = res.userId;
            setTimeout(() => {        
              this.router.navigate(['/home']);
            }, 200);
            this.toastService.show("Successfully user", {classname:'bg-success', "delay":"1500"});
          },error=>{
            this.toastService.show("El usuario no existe en la base de datos", {classname:'bg-danger', "delay":"1500"});
          })
        }
      } catch (error){
        this.toastService.show("Error login", {classname:'bg-warning', "delay":"1000"});
      }
  }
  
  autoCompletarUsuario(email:string,password:string) {
    this.database.emailUsuarioLogeado = email;
    this.usuario = {
      username:email,
      password:password,
    }
  }

}
