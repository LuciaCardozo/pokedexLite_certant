import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lista: any = [];
  pokemonSeleccionado: any;
  constructor(private router: Router, private apiPS: ApiPokemonService) {
  }

  async ngOnInit() {
    this.apiPS.getSwagger(this.apiPS.userId).subscribe((data)=>{
     data.forEach((poke)=>{
      if(poke != null){
        this.lista.push(poke);
      }
     });
    });
    this.apiPS.listaPokemones = this.lista;
    //console.log(this.http.listaPokemones)
  }

  public seleccionarPokemon(pokemon: any) {
    this.pokemonSeleccionado = pokemon;
    this.apiPS.pokemonSeleccionado = pokemon
    this.router.navigate(['/addEdit']);
  }

  onLogout() {
    this.apiPS.isLogged = false;
    this.router.navigate(['/login']);
  }

  IrAAgregar(){
    this.apiPS.pokemonSeleccionado = null;
    this.router.navigate(['/addEdit']);
  }
}