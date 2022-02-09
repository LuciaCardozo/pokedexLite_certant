import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon } from 'src/app/class/pokemon';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lista: Pokemon[] = [];
  username:string = "";
  constructor(private router: Router, private apiPS: ApiPokemonService, private carousel:NgbCarouselConfig) {
    this.carousel.interval = 2500;
    this.username = this.apiPS.emailUsuarioLogeado;
  }

  async ngOnInit() {
    this.apiPS.getSwagger(this.apiPS.userId).subscribe({
      next: (res) => {
        this.lista = res.filter((poke)=>poke != null)
        this.apiPS.listaPokemones = this.lista;
      },
      error: (error) =>{
        console.log("No se pudo cargar los pokemones, error:",error);
      }
    });
  }

  public seleccionarPokemon(pokemon: Pokemon) {
    this.apiPS.pokemonSeleccionado = pokemon
    this.router.navigate(['/addEdit']);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }

  IrAAgregar(){
    this.apiPS.pokemonSeleccionado = null;
    this.router.navigate(['/addEdit']);
  }
}