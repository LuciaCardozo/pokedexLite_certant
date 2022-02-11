import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../class/client';
import { DefaultService, Pokemon, PokemonBody, PokemonService, SecurityService } from '../swaggerApi';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})

export class ApiPokemonService {
  ultimoId:number=10;
  pokemonSeleccionado:any;
  listaPokemones:any = [];
  emailUsuarioLogeado: any;
  userId:number = 0;

  constructor(private swaggerApi:PokemonService, private apiClient:SecurityService) { }

  ngOnInit(): void { }

  getSwaggerCliente(cliente:Client){
    return this.apiClient.loginPOST(cliente,"body");
  }

  getSwagger(id:number){
    return this.swaggerApi.pokemonGet(id.toString());
  }

  postSwagger(pokemon:PokemonBody){
    return this.swaggerApi.pokemonPOST(pokemon, 'body');
  }

   putSwagger(pokemon:Pokemon){
    return this.swaggerApi.pokemonPUT(pokemon);
  }

}
