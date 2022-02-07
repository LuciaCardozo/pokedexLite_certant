import { Injectable } from '@angular/core';
import { PokemonService } from '../swaggerApi';

@Injectable({
  providedIn: 'root'
})

export class ApiPokemonService {
  ultimoId:number=10;
  pokemonSeleccionado:any;
  listaPokemones:any = [];
  constructor(private swaggerApi:PokemonService) { }

  ngOnInit(): void {
  }

  getSwagger(id:any){
    return this.swaggerApi.pokemonGet(id);
  }

  async postSwagger(pokemon:any){
    return await this.swaggerApi.pokemonPOST(pokemon, 'body').subscribe();
  }

  async putSwagger(pokemon:any){
    return await this.swaggerApi.pokemonPUT(pokemon).subscribe();
  }

}
