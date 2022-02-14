import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../swaggerApi/api/user.service';
import { User } from '../swaggerApi/model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  listUser:User[] = [];
  constructor(private userApiSwagger:UserService) { }

  getUser():Observable<Array<User>>{
    return this.userApiSwagger.userGet();
  }

  postUser(user:User):Observable<User>{
    return this.userApiSwagger.userPost(user,'body');
  }

  putUser(id:string,user:User):Observable<any>{
    return this.userApiSwagger.userUserIdPut(id,user,'body');
  }

  getUserById(id:string):Observable<User>{
    return this.userApiSwagger.userUserIdGet(id,'body');
  }


}
