import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  imagenASubir: any;
  pokemon:any = [];
  tipoSeleccionado: string = "";
  nombreAEditar: string = "";
  eliminarTipo: boolean = false;
  pokemonEvolucion:any = [];
  existePokemon: boolean = false;
  formulario: FormGroup;

  constructor(private database: DatabaseService, private afAuth: AngularFireAuth,private apiPokemon: ApiPokemonService,
    private router: Router, private toast: ToastService, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      types: ["", Validators.required],
      name: ["", Validators.required],
      lvl: ["", Validators.required],
      abilityName: ["", Validators.required],
      abilityDescription: ["", Validators.required] });
  }

  async ngOnInit() {
    this.pokemon = this.apiPokemon.pokemonSeleccionado;
    if(this.pokemon){
      this.existePokemon = true;
      this.pokemonEvolucion = this.apiPokemon.listaPokemones.find((poke:any)=>poke.id==this.pokemon.evolutionId);
    }else{
      this.existePokemon = false;
    }
  }

  deleteType(pokemon: any, type: string) {
    let index = pokemon.type.indexOf(type);
    if (index > -1) {
      pokemon.type.splice(index, 1);
      //console.log(pokemon);
    }
    this.eliminarTipo = false;
    this.tipoSeleccionado = "";
  }

  addType(pokemon: any, type: string) {
    if (this.tipoSeleccionado != "") {
      let pokemonToUpperCase = pokemon.type.map((tipo:any)=>tipo.toUpperCase());
      let typeToUpperCase = type.toUpperCase();
      let existePokemon = pokemonToUpperCase.indexOf(typeToUpperCase);
      if(existePokemon > -1){
        this.toast.show("Ya existe este tipo", { classname: 'bg-warning', "delay": "2000" });
      }else{
        pokemon['type'].push(type);
        this.tipoSeleccionado = "";
      }
    } else {
      this.toast.show("Completa el campo", { classname: 'bg-danger', "delay": "2000" });
    }
  }

  cerrarPop() {
    this.tipoSeleccionado = "";
    this.eliminarTipo = false;
  }

  onLogout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
  
  volverAlMenu() {
    this.router.navigate(['/home']);
  }

  cargarImagen(event:any) {
    console.log(event.target.files);
    let archivos = event.target.files
    let reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      this.database.subirImagen("img" + " " + Date.now(), reader.result).then(urlImg => {
        this.imagenASubir = urlImg;
        //console.log(urlImg); 
      });
    }
  }

  altaPokemon() {
    let nuevoPokemon = {
      "pokemon": {
        id: this.apiPokemon.ultimoId++,
        name: this.formulario.value.name,
        lvl: this.formulario.value.lvl,
        evolutionId: 0,
        abilities: [{
          name: this.formulario.value.abilityName,
          description: this.formulario.value.abilityDescription
        }],
        type: [this.formulario.value.types],
        image: this.imagenASubir
      },
      "userId": this.database.userId
    };
    this.apiPokemon.postSwagger(nuevoPokemon).then((data) => {
      console.log(data);
    });
    console.log(nuevoPokemon);
    this.volverAlMenu();
  }

  modificar(pokemon: any) {
    let pokemonEditado = {
      id: pokemon.id,
      name: this.nombreAEditar ? this.nombreAEditar : pokemon.name,
      lvl: pokemon.lvl,
      evolutionId: pokemon.evolutionId,
      abilities: this.pokemon.abilities,
      type: pokemon.type,
      image: pokemon.image
    };
    console.log(pokemonEditado);
    this.apiPokemon.putSwagger(pokemonEditado).then((res) => {
      console.log(res);
    });
    this.volverAlMenu();
  }

}

