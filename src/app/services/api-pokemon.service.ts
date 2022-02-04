import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaPokemonesI } from '../Modelos/listaPokemones.interface';
import { PokemonService } from '../swaggerApi';

@Injectable({
  providedIn: 'root'
})
export class ApiPokemonService {
  ultimoId:number=10;
  constructor(private http: HttpClient, private swaggerApi:PokemonService) { }

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

  getAllPokemones(id:any):Observable<ListaPokemonesI[]>{
    let direccion = "/pokedex-api/pokemon?userId="+id;
    return this.http.get<ListaPokemonesI[]>(direccion);
  }
  
  addPokemon(pokemon:any,id:any){
    let direccion = "/pokedex-api/pokemon?userId="+id;
    return this.http.post(direccion,pokemon);
  }

  updatePokemon(pokemon:any,id:any):Observable<ListaPokemonesI[]>{
    let direccion = "/pokedex-api/pokemon?userId="+id;
    return this.http.post<ListaPokemonesI[]>(direccion,pokemon);
  }

}
