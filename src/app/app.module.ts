import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { AngularFireModule} from '@angular/fire/compat';
import { ToastComponent } from './components/toast/toast.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from './swaggerApi';
import { InputComponent } from './components/input/input.component';
import { ModalComponent } from './components/modal/modal.component';
import { TitleDecorationComponent } from './components/title-decoration/title-decoration.component';

const firebaseConfig = {
  apiKey: "AIzaSyDFS-2rJTcwby8d9K0PY6cw82haLpsfKOQ",
authDomain: "scenic-setup-298622.firebaseapp.com",
databaseURL: "https://scenic-setup-298622-default-rtdb.firebaseio.com",
projectId: "scenic-setup-298622",
storageBucket: "scenic-setup-298622.appspot.com",
messagingSenderId: "645397347517",
appId: "1:645397347517:web:7e5290e77b6530c9484bd4"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddEditComponent,
    ToastComponent,
    ErrorComponent,
    InputComponent,
    ModalComponent,
    TitleDecorationComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpClientModule,
    ApiModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
