import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatDialog} from "@angular/material/dialog";
import {AgregarComponent} from "../agregar/agregar.component";
import {ActualizarComponent} from "../actualizar/actualizar.component";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer : BreakpointObserver, private cd:ChangeDetectorRef,private matDialog:MatDialog) {
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
  openDialog(){
    this.matDialog.open(AgregarComponent,{
      width: '400px'
    })
  }
  openDialog1(){
    this.matDialog.open(ActualizarComponent,{
      width:'400px'
    })
  }

}
