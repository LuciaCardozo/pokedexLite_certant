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
  list: Pokemon[] = [];
  username:string = "";
  constructor(private router: Router, private apiPokemon: ApiPokemonService, private carousel:NgbCarouselConfig) {
    this.carousel.interval = 2500;
    this.username = this.apiPokemon.emailUserRegistered;
  }

  async ngOnInit() {
    this.apiPokemon.getSwagger(this.apiPokemon.userIdRegistered).subscribe({
      next: (res) => {
        this.list = res.filter((poke)=>poke != null)
        this.apiPokemon.listPokemon = this.list;
      },
      error: (error) =>{
        console.log("No se pudo cargar los pokemones, error:",error);
      }
    });
  }

  public selectPokemon(pokemon: Pokemon) {
    this.apiPokemon.selectedPokemon = pokemon
    this.router.navigate(['/addEdit']);
  }

  IrAAgregar(){
    this.apiPokemon.selectedPokemon = null;
    this.router.navigate(['/addEdit']);
  }
}