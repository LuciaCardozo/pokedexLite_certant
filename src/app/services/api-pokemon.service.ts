import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../class/client';
import { Pokemon } from '../class/pokemon';
import { PokemonService } from '../swaggerApi/api/pokemon.service';
import { LoginPostResponse } from '../swaggerApi/model/loginPostResponse';
import { PokemonBody } from '../swaggerApi/model/pokemonBody';
import { SecurityService } from '../swaggerApi/api/security.service';

@Injectable({
  providedIn: 'root'
})

export class ApiPokemonService {
  lastId:number=10;
  selectedPokemon:Pokemon = new Pokemon;
  listPokemon:Pokemon[] = [];
  emailUserRegistered:string = "";
  userIdRegistered:string = "";

  constructor(private swaggerApi:PokemonService, private apiClient:SecurityService) { }
  ngOnInit(): void { }

  getSwaggerCliente(client:Client):Observable<LoginPostResponse>{
    return this.apiClient.loginPOST(client,"body");
  }

  getSwagger(id:string):Observable<Array<Pokemon>>{
    return this.swaggerApi.pokemonGet(id);
  }

  postSwagger(pokemon:PokemonBody):Observable<any>{
    return this.swaggerApi.pokemonPost(pokemon, 'body');
  }

   putSwagger(pokemon:Pokemon):Observable<any>{
    return this.swaggerApi.pokemonPut(pokemon);
  }

}
