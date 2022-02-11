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

  constructor(private swaggerApi:PokemonService, private apiClient:SecurityService) { }

  ngOnInit(): void { }

  getSwaggerCliente(cliente:any){
    return this.apiClient.loginPOST(cliente,"body");
  }

  getSwagger(id:any){
    return this.swaggerApi.pokemonGet(id);
  }

  postSwagger(pokemon:any){
    return this.swaggerApi.pokemonPOST(pokemon, 'body');
  }

   putSwagger(pokemon:any){
    return this.swaggerApi.pokemonPUT(pokemon);
  }

}
