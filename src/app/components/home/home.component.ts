import { Component, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lista: any = [];
  pokemonSeleccionado: any;
  constructor(private router: Router, private afAuth: AngularFireAuth, private http: ApiPokemonService,
    private database:DatabaseService) {
  }

  async ngOnInit() {
    this.http.getSwagger(this.database.userId).subscribe((data)=>{
     data.forEach((poke)=>{
      if(poke != null){
        this.lista.push(poke);
      }
     });
    });
    this.http.listaPokemones = this.lista;
    //console.log(this.http.listaPokemones)
  }

  public seleccionarPokemon(pokemon: any) {
    this.pokemonSeleccionado = pokemon;
    this.http.pokemonSeleccionado = pokemon
    this.router.navigate(['/addEdit']);
  }

  onLogout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  IrAAgregar(){
    this.http.pokemonSeleccionado = null;
    this.router.navigate(['/addEdit']);
  }
}