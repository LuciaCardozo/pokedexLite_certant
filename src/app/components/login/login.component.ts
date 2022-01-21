import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = {
    email: '',
    password: ''
  };
  listaDeCorreos: any = [];
  isLogged = false;
  userLogged:string = "";

  constructor(private database: DatabaseService, private router: Router, private toastService: ToastService) { 
  }

  async ngOnInit() {
    const res = await this.database.traerTodo('users');
    res?.subscribe((listaref: any) => {
      this.listaDeCorreos = listaref.map((userRef: any) => userRef.payload.doc.data());
    });
  }

  loginConValidacion() {
    let existe=this.listaDeCorreos.find((email: any) => email.email == this.usuario.email && email.password == this.usuario.password);
    if (existe) {
      try{
          this.database.onLogin(this.usuario.email, this.usuario.password).then(()=>{
          this.database.emailUsuarioLogeado = this.usuario.email;
          setTimeout(() => {        
            this.router.navigate(['/home']);
          }, 200);
          this.toastService.show("Successfully user", {classname:'bg-success', "delay":"2000"});
        });
      }catch(error){
        this.toastService.show("Error login", {classname:'bg-warning', "delay":"2000"});
      }
    }else if(this.usuario.email == '' || this.usuario.password==''){
      this.toastService.show("Por favor complete todos los campos", {classname:'bg-warning', "delay":"2000"});
    }else{
      this.toastService.show("El usuario no existe en la base de datos", {classname:'bg-danger',"delay":"2000"});
    }
  }
  
  autoCompletarUsuario(email:string,password:string) {
    this.usuario={
      email:email,
      password:password
    }
  }

}
