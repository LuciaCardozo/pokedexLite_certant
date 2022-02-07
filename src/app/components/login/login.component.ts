import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';


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

  constructor(private database: DatabaseService, private router: Router, private toastService: ToastService) { 
  }

  async ngOnInit() { }

  loginConValidacion() {
    if(this.usuario.username == "master" || this.usuario.username == "trainer" && this.usuario.password == "password"){
      try{
        this.database.isLogged = true;
        setTimeout(() => {        
          this.router.navigate(['/home']);
        }, 200);
        this.toastService.show("Successfully user", {classname:'bg-success', "delay":"2000"});
      } catch (error){
        this.toastService.show("Error login", {classname:'bg-warning', "delay":"2000"});
      }
    }else if(this.usuario.username == '' || this.usuario.password==''){
      this.toastService.show("Por favor complete todos los campos", {classname:'bg-warning', "delay":"2000"});
    }else{
      this.toastService.show("El usuario no existe en la base de datos", {classname:'bg-danger',"delay":"2000"});
    }
  }
  
  autoCompletarUsuario(email:string,password:string) {
    this.database.emailUsuarioLogeado = email;
    this.usuario = {
      username:email,
      password:password,
    }
    this.database.getSwaggerCliente(this.usuario).subscribe((res)=>{
      this.database.userId = res.userId;
    })
  }

}
