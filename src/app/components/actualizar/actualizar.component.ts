import { Component } from '@angular/core';
import {Restaurant} from "../../models/restaurant";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TableComponent} from "../table/table.component";
import {RestaurantService} from "../../services/restaurant.service";


@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent {
  selected = 'none'
  restaurante : Array<Restaurant>
  formRestaurant: FormGroup

  constructor(private restaurantService:RestaurantService, private fb:FormBuilder ) {
    this.formRestaurant = fb.group({
      id :new FormControl('',[Validators.required]),
      name : new FormControl('',[Validators.required]),
      description : new FormControl('',[Validators.required]),
      address : new FormControl('',[Validators.required]),
      typeCousin : new FormControl('',[Validators.required]),
      phone : new FormControl('',[Validators.required]),
    })
  }


}
