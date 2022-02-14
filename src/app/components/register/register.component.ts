import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  constructor(private fb:FormBuilder,private userApi:ApiUserService,private router:Router,
    private toast:ToastService) { 
    this.form = fb.group({
      role: ["",Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void { 
    this.userApi.getUser().subscribe({
      next: (res) => {
        this.userApi.listUser = res;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  registerUser() {
    if(this.form.value.firstName == "" || this.form.value.lastName == "" || this.form.value.role == ""
      || this.form.value.username == "" || this.form.value.password == "") {
        this.toast.show("Completa el campo", { classname: 'bg-danger', "delay": "2000" });
    }else{
      let newUser = {
        firstName:this.form.value.firstName,
        id: this.proximoIdUser(),
        lastName:this.form.value.lastName,
        password:this.form.value.password,
        role: [this.form.value.role],
        pokemonCount:0,
        username:this.form.value.username
      }
      this.userApi.postUser(newUser).subscribe({
        next: () => {
          localStorage.setItem('user',JSON.stringify(newUser));
          this.router.navigate(['/home']);
        },
        error: () => {
          this.toast.show("Upp! algo salio mal (Error PostUser)", { classname: 'bg-danger', "delay": "2000" });
        }
      });
    }
   
    console.log(this.userApi.listUser)
  }

  proximoIdUser(){
    return this.userApi.listUser.reduce((index:any,user)=>{
      let id=Number(user.id);
      if(index<id){
        index=id;
        return index;
      }
    },0)+1;
  }

}
