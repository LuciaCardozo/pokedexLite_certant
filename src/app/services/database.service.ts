import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';
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

  public emailUsuarioLogeado: any;
  public isLogged: any = false;
  public storageRef = firebase.app().storage().ref();

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => this.isLogged = user);//en el caso de no estar logueado devuelve un null
    // this.users = this.firestore.collection('users').valueChanges();
  }

  async alta(coleccion: any, dato: any) {
    try {
      return await this.firestore.collection(coleccion).add(dato);
    }
    catch (error) {
      alert(error);
      return null;
    }
  }

  //LOGIN
  async onLogin(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Error on login", error);
      return error;
    }
  }

  async onLoginWinthGoogle() {
    try {
      return await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log("Error on login", error);
      return error;
    }
  }

  async traerTodo(coleccion: any) {
    try {
      return await this.firestore.collection(coleccion).snapshotChanges();
    }
    catch (error) {
      alert(error);
      return null;
    }
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
}
