import {ChangeDetectorRef, Component} from '@angular/core';
import {Restaurant} from "../../models/restaurant";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {RestaurantService} from "../../services/restaurant.service";


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent {

  selected = 'none'
  restaurante : Array<Restaurant>
  formRestaurant: FormGroup


  constructor(private restaurantService:RestaurantService, private fb:FormBuilder ) {
    this.formRestaurant = fb.group({
      name : new FormControl('',[Validators.required]),
      description : new FormControl('',[Validators.required]),
      address : new FormControl('',[Validators.required]),
      typeCousin : new FormControl('',[Validators.required]),
      phone : new FormControl('',[Validators.required]),
    })
  }
  saveRestaurant(){
    if (this.formRestaurant.valid){
      let restaurant = new Restaurant()
      restaurant.nombre = this.formRestaurant.get('name')?.value
      restaurant.descripcion = this.formRestaurant.get('description')?.value
      restaurant.direccion = this.formRestaurant.get('address')?.value
      restaurant.tipo_cocina = this.formRestaurant.get('typeCousin')?.value
      restaurant.celular = this.formRestaurant.get('phone')?.value
      this.restaurantService.createRestaurant(restaurant).subscribe(res =>{
        console.log(res)
        this.formRestaurant.reset()
      })
    }
  }

}
