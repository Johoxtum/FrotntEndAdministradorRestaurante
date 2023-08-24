import {Component, OnInit} from '@angular/core';
import {AdminService} from "./services/admin.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'administrador-restaurante';


  constructor() {
  }

  ngOnInit(): void {
  }
}
