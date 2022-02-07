import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Observable } from 'rxjs';
import { SecurityService } from '../swaggerApi';
const firebaseConfig = {
  apiKey: "AIzaSyDFS-2rJTcwby8d9K0PY6cw82haLpsfKOQ",
authDomain: "scenic-setup-298622.firebaseapp.com",
databaseURL: "https://scenic-setup-298622-default-rtdb.firebaseio.com",
projectId: "scenic-setup-298622",
storageBucket: "scenic-setup-298622.appspot.com",
messagingSenderId: "645397347517",
appId: "1:645397347517:web:7e5290e77b6530c9484bd4"
}
firebase.initializeApp(firebaseConfig);
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private user: Observable<firebase.User | null>;
  public emailUsuarioLogeado: any;
  public userId:any;
  public isLogged: any = false;
  public storageRef = firebase.app().storage().ref();

  constructor(private afAuth: AngularFireAuth,private apiClient:SecurityService) {
    afAuth.authState.subscribe(user => this.isLogged = user);//en el caso de no estar logueado devuelve un null
    this.user = this.afAuth.authState;
  }

  async subirImagen(nombre: string, img64: any) {
    try {
      console.log(img64);
      let respuesta = await this.storageRef.child("pokemones/" + nombre).putString(img64, 'data_url');
      return await respuesta.ref.getDownloadURL();
    } catch (error) {
      console.log("ERROR " + error);
      return null;
    }
  }

  getSwaggerCliente(cliente:any){
    return this.apiClient.loginPOST(cliente,"body");
  }
}
