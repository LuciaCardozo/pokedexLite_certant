import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiPokemonService {

  listPokemon: any = [];
  list: any = [];
  pokemons:any=[];

  constructor(private http: HttpClient) { 
    for (let i = 1; i < 20; i++) {
      this.getEvolutionChain(i);
    }
  }

  ngOnInit(): void {
    console.log("lasdasd");
  }

  getEvolutionChain(pokeId: number) {
    this.http.get(`https://pokeapi.co/api/v2/evolution-chain/${pokeId}/`).subscribe((response: any) => {
      var evoluciones: any = [];
      var evoData = response.chain;
      let newEvolutions:any;
      do {
        var evoDetails = evoData['evolution_details'][0];
        newEvolutions = {
          "name": evoData.species.name,
          "min_level": !evoDetails ? 1 : evoDetails.min_level
        }
        if (evoData['evolution_details'].length === 0) {
          newEvolutions['isBase'] = true;
        }
        evoluciones.push(newEvolutions);
        this.addPokemonInfoByName(evoData.species.name, evoluciones);
        console.log()
        evoData = evoData['evolves_to'][0];
      } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    });
  }

  addPokemonInfoByName(name: string, evoluciones: any) {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).subscribe((resPoke: any) => {
      let infoPoke = {
        name: name,
        lvl: resPoke.base_experience,
        img: resPoke.sprites.front_shiny,
        imgHd: resPoke.sprites.other.dream_world.front_default,
        evoluciones: evoluciones,
        types: this.getTypeOfPokemon(resPoke),
        abilities: this.getAbilitiesOfPokemon(resPoke),
        isBase: (name == evoluciones.filter((evolucion: any) => evolucion.isBase)[0].name )? true : false
      }
        this.pokemons.push(infoPoke);
        this. getPokemonByIdOrName(infoPoke);
      //console.log(this.pokemons)
    });
  }

  getAbilitiesOfPokemon(pokemon: any) {
    return pokemon.abilities.map((ability: any) => ability.ability.name);
  }

  getTypeOfPokemon(pokemon: any) {
    return pokemon.types.map((type: any) => type.type.name);
  }

  traerPokemones(url: any) {
    let newPokemon: any;
    this.http.get(url).subscribe((res: any) => {
      this.listPokemon = res.results;
      this.listPokemon.forEach((element: any) => {
        this.http.get(element.url).subscribe((resPokemon: any) => { 
          newPokemon = {
            "id": resPokemon.id,
            'name': resPokemon.name,
            'lvl': resPokemon.base_experience,
            'image': resPokemon.sprites.other.dream_world.front_default
          };

          newPokemon['types'] = [];
          resPokemon.types.forEach((type: any) => {
            newPokemon['types'].push(type.type.name);
          });

          newPokemon['abilities'] = [];
          resPokemon.abilities.forEach((ability: any) => {
            newPokemon['abilities'].push(ability.ability.name);
          });
         this.list.push(newPokemon);    
        });
      });
    });
    return this.list;
  }

  getPokemonByIdOrName(pokemon:any){
    //console.log(pokemon);
    pokemon.evoluciones.forEach((evolucion:any) => {
      this.http.get("https://pokeapi.co/api/v2/pokemon/"+evolucion.name).subscribe((res:any)=>{
        evolucion['img']=res.sprites.other.dream_world.front_default;
        evolucion['types']=this.getTypeOfPokemon(res);
        //console.log(evolucion);
      });
    });
  }

}
