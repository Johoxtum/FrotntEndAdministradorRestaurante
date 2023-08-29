import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Restaurant} from "../models/restaurant";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  rutaGlobal = 'http://localhost:8080/restaurant/'
  private restaurantUpdated = new Subject<void>();
  constructor(private http:HttpClient) { }

  createRestaurant(res:Restaurant){
    return this.http.post<Restaurant>(this.rutaGlobal + 'create',res,{
      observe : 'response'
    })
  }
  getRestaurantes(){
    return this.http.get<Restaurant[]>(this.rutaGlobal)
  }

  updateRestaurant(id:number, res: Restaurant){
    return this.http.patch<Restaurant>(this.rutaGlobal + `update/` + id, res, {
      observe: 'response'
    })
  }
  deleteRestaurant(id:number){
    return this.http.delete<Restaurant>(this.rutaGlobal + 'delete/' + id,{
      observe: 'response'
    })
  }

  notifyRestaurantUpdate() {
    this.restaurantUpdated.next();
  }

  // Método para suscribirse a las actualizaciones
  onRestaurantUpdate(): Observable<void> {
    return this.restaurantUpdated.asObservable();
  }



}
