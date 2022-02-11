import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/class/pokemon';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  imageToUpload: any;
  pokemon:any = [];
  selectedType: string = "";
  editName: string = "";
  deleteType: boolean = false;
  deleteEvolution:boolean = false;
  evolvedPokemon:any = [];
  pokemonExists: boolean = false;
  form: FormGroup;

  constructor(private apiPokemon: ApiPokemonService,
    private toast: ToastService, private fb: FormBuilder,private router: Router) {
      this.form = this.fb.group({
      idEvolution: ["",Validators.required],
      types: ["", Validators.required],
      name: ["", Validators.required],
      lvl: ["", Validators.required],
      abilityName: ["", Validators.required],
      abilityDescription: ["", Validators.required] });
  }

  async ngOnInit() {
    this.pokemon = this.apiPokemon.selectedPokemon;
    if(this.pokemon.id) {
      this.pokemonExists = true;
      this.evolvedPokemon = this.apiPokemon.listPokemon.find((poke:any)=>poke.id==this.pokemon.evolutionId);
    }else {
      this.pokemonExists = false;
    }
  }

  removeType(pokemon: any, type: string) {
    let index = pokemon.type.indexOf(type);
    if (index > -1) {
      pokemon.type.splice(index, 1);
    }
    this.deleteType = false;
    this.selectedType = "";
  }

  addType(pokemon: any, type:any) {
    if (type != "") {
      let pokemonToUpperCase = pokemon.type.map((tipo:any)=>tipo.toUpperCase());
      let typeToUpperCase = type.toUpperCase();
      let existePokemon = pokemonToUpperCase.indexOf(typeToUpperCase);
      if(existePokemon > -1) {
        this.toast.show("Ya existe este tipo", { classname: 'bg-warning', "delay": "2000" });
      }else {
        pokemon['type'].push(type);
      }
    } else {
      this.toast.show("Completa el campo", { classname: 'bg-danger', "delay": "2000" });
    }
  }

  closePopup() {
    this.selectedType = "";
    this.deleteType = false;
    this.deleteEvolution =false
  }

  uploadImage(event:any) {
    let archivoCapturado = event.target.files[0];
    this.imageToUpload = "assets/"+archivoCapturado.name;
  }

  addPokemon() {
    if(this.form.value.name == "" && this.form.value.lvl == 0 && this.form.value.types == ""
    && this.form.value.abilityDescription == "" && this.form.value.abilityName == ""){
      this.toast.show("Completa el campo", { classname: 'bg-danger', "delay": "2000" });
    }else {
      if(this.form.value.idEvolution < 0 || this.form.value.lvl <= 0){
        this.toast.show("Solo se acepta un valor positivo", { classname: 'bg-warning', "delay": "2000" });
      }else {
        let newPokemon = {
          "pokemon": {
            id: this.apiPokemon.lastId++,
            name: this.form.value.name,
            lvl: Number(this.form.value.lvl),
            evolutionId:  Number(this.form.value.idEvolution),
            abilities: [{
              name: this.form.value.abilityName,
              description: this.form.value.abilityDescription
            }],
            type: [this.form.value.types],
            image: this.imageToUpload?this.imageToUpload:"https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1410117402/content-items/000/671/812/00logo-original.jpg?1410117402"
          },
          "userId": String(this.apiPokemon.userIdRegistered)
        };
        this.apiPokemon.postSwagger(newPokemon).subscribe({
          next: ()=>{
            this.router.navigate(['/home']);
          },
          error: ()=>{
            this.toast.show("Upp! algo salio mal (Error Post)", { classname: 'bg-danger', "delay": "2000" });
          }
        });
      }
    }
  }

  modifyPokemon(pokemon: any) {
    let editedPokemon = {
      id: pokemon.id,
      name: this.editName ? this.editName : pokemon.name,
      lvl: pokemon.lvl,
      evolutionId: pokemon.evolutionId,
      abilities: this.pokemon.abilities,
      type: pokemon.type,
      image: pokemon.image
    };
    this.apiPokemon.putSwagger(editedPokemon).subscribe({
      next: ()=>{
        this.router.navigate(['/home']);
      },
      error: ()=>{
        this.toast.show("Upp! algo salio mal (Error Post)", { classname: 'bg-danger', "delay": "2000" });
      }
    });
  }

  removeIdEvolution(pokemon:any){
    pokemon.evolutionId = 0;
    this.deleteEvolution = false;
  }

  addIdEvolution(pokemon:any,evolution:number) {
    if(evolution>0) {
      pokemon.evolutionId = evolution;
      this.evolvedPokemon = this.apiPokemon.listPokemon.find((poke:any)=>poke.id==evolution);
    } else {
      this.toast.show("Solo se acepta un valor positivo", { classname: 'bg-warning', "delay": "2000" });
    }
  }
  
}