import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Restaurant} from "../models/restaurant";
import {registerModel} from "../models/register";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  rutaGlobal = 'http://localhost:8080/restaurant/'
  constructor(private http:HttpClient) { }

  createRestaurant(res:Restaurant){
    return this.http.post<Restaurant>(this.rutaGlobal + 'create',res,{
      observe : 'response'
    })
  }
  getRestaurantes(){
    return this.http.get<Restaurant[]>(this.rutaGlobal)
  }

}
