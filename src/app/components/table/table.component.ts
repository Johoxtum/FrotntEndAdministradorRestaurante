import {Component, OnInit} from '@angular/core';
import {Restaurant} from "../../models/restaurant";
import {AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {RestaurantService} from "../../services/restaurant.service";
import {catchError, of, Subscription} from "rxjs";
import {Message} from "primeng/api";

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
  messages: Message[] = [];
  messages1: Message[] = [];
  selectedRestaurantId: number | null;
  private restaurantUpdateSubscription: Subscription;
  constructor(private fb:FormBuilder, private restaurantService:RestaurantService) {
    this.restaurante = new Array<Restaurant>()

    this.formularioRestaurante = fb.group({
      name : new FormControl('',[Validators.required]),
      description : new FormControl('',[Validators.required]),
      address : new FormControl('',[Validators.required]),
      typeCousin : new FormControl('',[Validators.required]),
      phone : new FormControl('',[Validators.required]),
    })
    this.restaurantUpdateSubscription = this.restaurantService.onRestaurantUpdate().subscribe(()=>{
      this.getRestaurantes()
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
  ngOnDestroy() {
    this.restaurantUpdateSubscription.unsubscribe();
  }

  deleteRestaurante(idRestaurant:number){
    this.restaurantService.deleteRestaurant(idRestaurant).subscribe(res =>{
      this.messageDelete()
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
      this.messageUpdate()
      this.formularioRestaurante.reset()
      this.display = !this.display
    })
  }
  messageDelete(){
    this.messages = [
      { severity: 'success', summary: 'Success', detail: 'El restaurante se ha eliminado correctamente' },
    ];
    setTimeout(() => {
      this.messages = [];
    }, 3000);
  }
  messageUpdate(){
    this.messages1 = [
      { severity: 'success', summary: 'Success', detail: 'El restaurante se ha actualizado correctamente.' },
    ];
    setTimeout(() => {
      this.messages1 = [];
    }, 3000);
  }

}
