import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  //list: any = [];
  lista: any = [];

  pokemonSeleccionado: any;
  mostrarDiv = false;
  constructor(private router: Router, private afAuth: AngularFireAuth, private http: ApiPokemonService, private database:DatabaseService) {
  }

  async ngOnInit() {
    try{
      const res = await this.database.traerTodo("pokemones");
      res?.subscribe((listaref:any) => {
      this.lista = listaref.map((userRef:any) => userRef.payload.doc.data());
      
      return this.lista;
      });
    }catch(error){
      console.log("nose pudo subscribir la lista",error);
    }
  }

  public seleccionarPokemon(pokemon: any) {
    //console.log(this.lista);
    this.pokemonSeleccionado=pokemon;
    //this.database.alta("pokemones",this.pokemonSeleccionado);
    console.log(this.pokemonSeleccionado);
    this.mostrarDiv=true;
  }

  public cancelarEdicion() {
    this.mostrarDiv=false;
  }

  onLogout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}