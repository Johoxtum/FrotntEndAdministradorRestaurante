import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {registerModel} from "../models/register";
import {Login} from "../models/login";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  rutaGlobal = 'http://localhost:8080/admin/'
  constructor(private http:HttpClient) { }

  // Crear usuario
  createUser(user:registerModel){
    return this.http.post<registerModel>(this.rutaGlobal + 'create',user,{
      observe : 'response'
    })
  }
  //Logear
  loginUser(login:Login){
    return this.http.post<Login>(this.rutaGlobal + 'login',login,{
      observe : 'response'
    })
  }

  //Restablecer contraseña
}
