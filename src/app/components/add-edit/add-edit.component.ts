import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  imagenASubir:any;
  @Input() pokemon: any;
  @Input() cancelar: any;
  abilities:any = false;
  evolutions:any = false;
  listaEvolucion:any=[];
  habilidadSelecciona:string="";
  tipoSeleccionado:string="";
  listEvolution:any=[];
  list:any=[];

  pokemonNuevo:any = [{
      types:[],
      name:"",
      lvl:0,
      img:"",
      isBase:"",
      abilities:[]
    }];

  evoluciones:any={
      img:"",
      min_level:0,
      name:"",
      isBase:"",
      types:[]
    };
    
  constructor(private router: Router, private afAuth: AngularFireAuth, private apiPokemon:ApiPokemonService,private database:DatabaseService) { 
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  cargarImagen(event:any){
    console.log(event.target.files);
    let archivos = event.target.files
    let reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = ()=>{
      this.database.subirImagen("img"+" "+Date.now(),reader.result).then(urlImg=>{        
        this.imagenASubir=urlImg;
        console.log(urlImg); 
      });
    }
  }

  altaPokemon(event:any){
    let nuevoPokemon={
      types:[this.pokemonNuevo.types],
      name:this.pokemonNuevo.name,
      lvl:this.pokemonNuevo.lvl,
      img:this.imagenASubir,
      isBase:true,
      abilities:[this.pokemonNuevo.abilities],
      imgHd:this.imagenASubir,
      evoluciones:[{
        isBase:false,
        img:this.imagenASubir,
        min_level:this.evoluciones.min_level,
        name:this.evoluciones.name,
        types:[this.evoluciones.types]
      }]
     };
          
    this.database.alta("pokemones",nuevoPokemon);
    this.router.navigate(['/home']);
  }

  cancelarEdicion(){
    this.cancelar=false;
  }

  limpiarForm(){
    this.pokemonNuevo.name="";
    this.pokemonNuevo.types="";
    this.pokemonNuevo.lvl=0;
    this.pokemonNuevo.habilities="";
  }
}

