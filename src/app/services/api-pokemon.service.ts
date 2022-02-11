import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultService, PokemonService, SecurityService } from '../swaggerApi';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})

export class ApiPokemonService {
  ultimoId:number=10;
  pokemonSeleccionado:any;
  listaPokemones:any = [];
  emailUsuarioLogeado: any;
  userId:any;

  constructor(private swaggerApi:PokemonService, private apiClient:SecurityService,
    private router: Router,private toast: ToastService) { }

  ngOnInit(): void { }

  getSwaggerCliente(cliente:any){
    return this.apiClient.loginPOST(cliente,"body");
  }

  getSwagger(id:any){
    return this.swaggerApi.pokemonGet(id);
  }

  async postSwagger(pokemon:any){
    return await this.swaggerApi.pokemonPOST(pokemon, 'body').subscribe({
      next: ()=>{
        this.router.navigate(['/home']);
      },
      error: ()=>{
        this.toast.show("Upp! algo salio mal (Error Post)", { classname: 'bg-danger', "delay": "2000" });
      }
    });
  }

  async putSwagger(pokemon:any){
    return await this.swaggerApi.pokemonPUT(pokemon).subscribe({
      next: ()=>{
        this.router.navigate(['/home']);
      },
      error: ()=>{
        this.toast.show("Upp! algo salio mal (Error Put)", { classname: 'bg-danger', "delay": "2000" });
      }
    });
  }

}
