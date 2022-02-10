import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';
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
  eliminarEvolucion:boolean = false;
  pokemonEvolucion:any = [];
  existePokemon: boolean = false;
  formulario: FormGroup;
  evolucionNueva:number = 0;

  constructor(private apiPokemon: ApiPokemonService,
    private router: Router, private toast: ToastService, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      idEvolution: ["",Validators.required],
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
    }
    this.eliminarTipo = false;
    this.tipoSeleccionado = "";
  }

  addType(pokemon: any, type:any) {
    if (type != "") {
      let pokemonToUpperCase = pokemon.type.map((tipo:any)=>tipo.toUpperCase());
      let typeToUpperCase = type.toUpperCase();
      let existePokemon = pokemonToUpperCase.indexOf(typeToUpperCase);
      if(existePokemon > -1){
        this.toast.show("Ya existe este tipo", { classname: 'bg-warning', "delay": "2000" });
      }else{
        pokemon['type'].push(type);
      }
    } else {
      this.toast.show("Completa el campo", { classname: 'bg-danger', "delay": "2000" });
    }
  }

  cerrarPop() {
    this.tipoSeleccionado = "";
    this.eliminarTipo = false;
    this.eliminarEvolucion =false
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
  
  volverAlMenu() {
    this.router.navigate(['/home']);
  }

  cargarImagen(event:any) {
    let archivoCapturado = event.target.files[0];
    this.imagenASubir = "assets/"+archivoCapturado.name;
  }

  altaPokemon() {
    let nuevoPokemon = {
      "pokemon": {
        id: this.apiPokemon.ultimoId++,
        name: this.formulario.value.name,
        lvl: Number(this.formulario.value.lvl),
        evolutionId: this.formulario.value.idEvolution,
        abilities: [{
          name: this.formulario.value.abilityName,
          description: this.formulario.value.abilityDescription
        }],
        type: [this.formulario.value.types],
        image: this.imagenASubir
      },
      "userId": this.apiPokemon.userId
    };
    this.apiPokemon.postSwagger(nuevoPokemon).then();
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
    this.apiPokemon.putSwagger(pokemonEditado).then();
    this.volverAlMenu();
  }

  eliminarIdEvolucion(pokemon:any){
    pokemon.evolutionId = 0;
    this.evolucionNueva = 0;
    this.eliminarEvolucion = false;
  }

  agregarIdEvolucion(pokemon:any,evolucion:number) {
    if(evolucion>0) {
      pokemon.evolutionId = evolucion;
      this.pokemonEvolucion = this.apiPokemon.listaPokemones.find((poke:any)=>poke.id==evolucion);
    } else {
      this.toast.show("Solo se acepta un valor positivo", { classname: 'bg-warning', "delay": "2000" });
    }
  }
}

