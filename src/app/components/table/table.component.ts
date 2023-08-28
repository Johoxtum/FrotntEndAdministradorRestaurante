import {Component, OnInit} from '@angular/core';
import {Restaurant} from "../../models/restaurant";
import {AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {RestaurantService} from "../../services/restaurant.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  display: boolean = false;
  restaurante : Array<Restaurant>
  formularioRestaurante: FormGroup;
  selected = 'none'
  selectedRestaurantId: number | null;
  constructor(private fb:FormBuilder, private restaurantService:RestaurantService) {
    this.restaurante = new Array<Restaurant>()

    this.formularioRestaurante = fb.group({
      name : new FormControl('',[Validators.required]),
      description : new FormControl('',[Validators.required]),
      address : new FormControl('',[Validators.required]),
      typeCousin : new FormControl('',[Validators.required]),
      phone : new FormControl('',[Validators.required]),
    })
  }

  getRestaurantes(){
    this.restaurantService.getRestaurantes().subscribe(res =>{
      this.restaurante = res
    })
  }

  ngOnInit(): void {
    this.getRestaurantes()
  }

  deleteRestaurante(idRestaurant:number){
    this.restaurantService.deleteRestaurant(idRestaurant).subscribe(res =>{
      this.getRestaurantes()
    })
  }
  activar(restaurant: Restaurant){


    this.formularioRestaurante.get('name')?.setValue(restaurant.nombre)
    this.formularioRestaurante.get('description')?.setValue(restaurant.descripcion)
    this.formularioRestaurante.get('address')?.setValue(restaurant.direccion)
    this.formularioRestaurante.get('typeCousin')?.setValue(restaurant.tipo_cocina)
    this.formularioRestaurante.get('phone')?.setValue(restaurant.celular)
    if (restaurant.id !== null) {
      this.selectedRestaurantId = restaurant.id; // Almacenar el id seleccionado
    }
    this.display = !this.display
  }


  updateRestaurant(idRestaurant:number){

    let restaurant = new Restaurant()
    restaurant.id = this.formularioRestaurante.get('id')?.value
    restaurant.nombre = this.formularioRestaurante.get('name')?.value
    restaurant.descripcion = this.formularioRestaurante.get('description')?.value
    restaurant.direccion = this.formularioRestaurante.get('address')?.value
    restaurant.tipo_cocina = this.formularioRestaurante.get('typeCousin')?.value
    restaurant.celular = this.formularioRestaurante.get('phone')?.value
    this.restaurantService.updateRestaurant(idRestaurant,restaurant).subscribe(res =>{
      this.getRestaurantes()
      this.formularioRestaurante.reset()
      this.display = !this.display
    })
  }



}
