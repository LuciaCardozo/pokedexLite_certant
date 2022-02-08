import { Injectable } from '@angular/core';
import { DefaultService, PokemonService, SecurityService } from '../swaggerApi';

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

  async postSwagger(pokemon:any){
    return await this.swaggerApi.pokemonPOST(pokemon, 'body').subscribe();
  }

  async putSwagger(pokemon:any){
    return await this.swaggerApi.pokemonPUT(pokemon).subscribe();
  }

}
