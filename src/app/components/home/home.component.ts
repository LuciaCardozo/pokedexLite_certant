import { Component, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';
import { PokemonService } from 'src/app/swaggerApi/api/pokemon.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId = this.route.snapshot.paramMap.get("id");
  email:any;
  //list: any = [];
  lista: any = [];
  pokemonSeleccionado: any;
  constructor(private router: Router, private afAuth: AngularFireAuth, private http: ApiPokemonService,
    private route:ActivatedRoute,private swaggerApi:PokemonService) {
  }

  async ngOnInit() {
    this.http.getSwagger(this.route.snapshot.paramMap.get("id")).subscribe((data)=>{
     data.forEach((poke)=>{
      if(poke != null){
        this.lista.push(poke);
      }
     });
    });
  }

  public seleccionarPokemon(pokemon: any) {
    this.pokemonSeleccionado = pokemon;
    this.router.navigate(['/addEdit',this.pokemonSeleccionado.id]);
  }

  onLogout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}