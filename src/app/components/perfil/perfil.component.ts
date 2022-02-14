import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuarioLogeado:User = new User;
  name:string = "";
  lastname:string = "";
  constructor(private userIdRegistrado:ApiPokemonService, private userApi:ApiUserService, 
    private toast:ToastService, private router:Router) { }

  ngOnInit(): void {
    this.userApi.getUserById(this.userIdRegistrado.userIdRegistered).subscribe({
      next: (res)=>{
        this.usuarioLogeado = res;
      },
      error: ()=>{
        this.toast.show("Error en la carga de datos(c.perfil)", {classname:'bg-danger', "delay":"1500"});
      }
    });
  }

  modificarUsuario(){
    if(this.lastname == "" && this.name == ""){
      this.toast.show("No has completado los campos para modificar", { classname: 'bg-warning', "delay": "2000" });
    }else{
      let editUser = {
        firstName:this.name,
        id: this.usuarioLogeado.id,
        lastName:this.lastname,
        password:this.usuarioLogeado.password,
        role: this.usuarioLogeado.role,
        pokemonCount: this.usuarioLogeado.pokemonCount,
        username:this.usuarioLogeado.username
      }
      this.userApi.putUser(String(this.usuarioLogeado.id),editUser).subscribe({
        next: ()=>{ 
          this.toast.show("Modificacion Exitosa!!", { classname: 'bg-success', "delay": "1000" });
          this.router.navigate(['/home']);
        },
        error: ()=>{
          this.toast.show("Upp! algo salio mal (UserPut)", { classname: 'bg-danger', "delay": "2000" });
        }
      });
    }
  }
}
