import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../class/client';
import { Pokemon } from '../class/pokemon';
import { InlineResponse200, PokemonBody, PokemonService, SecurityService } from '../swaggerApi';

@Injectable({
  providedIn: 'root'
})

export class ApiPokemonService {
  lastId:number=10;
  selectedPokemon:Pokemon = new Pokemon;
  listPokemon:Pokemon[] = [];
  emailUserRegistered:string = "";
  userIdRegistered:number = 0;

  constructor(private swaggerApi:PokemonService, private apiClient:SecurityService) { }
  ngOnInit(): void { }

  getSwaggerCliente(client:Client):Observable<InlineResponse200>{
    return this.apiClient.loginPOST(client,"body");
  }

  getSwagger(id:number):Observable<Array<Pokemon>>{
    return this.swaggerApi.pokemonGet(id.toString());
  }

  postSwagger(pokemon:PokemonBody):Observable<any>{
    return this.swaggerApi.pokemonPOST(pokemon, 'body');
  }

   putSwagger(pokemon:Pokemon):Observable<any>{
    return this.swaggerApi.pokemonPUT(pokemon);
  }

}
