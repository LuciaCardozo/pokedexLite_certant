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
  constructor(private router: Router, private apiPS: ApiPokemonService) {
  }

  async ngOnInit() {
    this.apiPS.getSwagger(this.apiPS.userId).subscribe({
      next: (res) => {
        this.lista = res.filter((poke)=>poke != null)
      },
      error: (error) =>{
        console.log("No se pudo cargar los pokemones, error:",error);
      }
    });
    this.apiPS.listaPokemones = this.lista;
  }

  public seleccionarPokemon(pokemon: any) {
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