import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatDialog} from "@angular/material/dialog";
import {RestaurantService} from "../../services/restaurant.service";
import {Restaurant} from "../../models/restaurant";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Message} from "primeng/api";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{

  restaurante : Array<Restaurant>
  formRestaurant: FormGroup
  selected = 'none'
  display: boolean = false;
  messages: Message[] = [];
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private restaurantService:RestaurantService,private observer : BreakpointObserver, private cd:ChangeDetectorRef,private matDialog:MatDialog,private router:Router,private fb:FormBuilder) {
    this.formRestaurant = fb.group({
      name : new FormControl('',[Validators.required]),
      description : new FormControl('',[Validators.required]),
      address : new FormControl('',[Validators.required]),
      typeCousin : new FormControl('',[Validators.required]),
      phone : new FormControl('',[Validators.required]),
    })
  }

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((resp:any)=>{
      if (resp.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
    this.cd.detectChanges()
  }
  ngOnInit(): void {

  }
  saveRestaurant(){
    if (this.formRestaurant.valid){
      let restaurant = new Restaurant()
      restaurant.nombre = this.formRestaurant.get('name')?.value
      restaurant.descripcion = this.formRestaurant.get('description')?.value
      restaurant.direccion = this.formRestaurant.get('address')?.value
      restaurant.tipo_cocina = this.formRestaurant.get('typeCousin')?.value
      restaurant.celular = this.formRestaurant.get('phone')?.value
      this.restaurantService.createRestaurant(restaurant).subscribe( res =>{
        this.messageAdd()
        this.formRestaurant.reset()
        this.restaurantService.notifyRestaurantUpdate()
        this.display = !this.display
      })
    }
  }

  activar(){
    this.display = !this.display
  }

  salir(){
    this.router.navigate(['/login'])
  }

  messageAdd(){
    this.messages = [
      { severity: 'success', summary: 'Success', detail: 'El restaurante se ha creado correctamente' },
    ];
    setTimeout(() => {
      this.messages = [];
    }, 3000);
  }
  getRestaurantes(){
    this.restaurantService.getRestaurantes().subscribe(res =>{
      this.restaurante = res
    })
  }

}
