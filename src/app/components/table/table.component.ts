import {Component, OnInit} from '@angular/core';
import {Restaurant} from "../../models/restaurant";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RestaurantService} from "../../services/restaurant.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  restaurante : Array<Restaurant>
  formularioRestaurante: FormGroup;
  constructor(private fb:FormBuilder, private restaurantService:RestaurantService) {
    this.restaurante = new Array<Restaurant>()

    this.formularioRestaurante = fb.group({
      name : new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      direction: new FormControl('',[Validators.required]),
      category:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required]),
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

}
