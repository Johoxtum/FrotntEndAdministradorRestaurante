import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {RegistrateComponent} from "./pages/registrate/registrate.component";
import {AgregarComponent} from "./components/agregar/agregar.component";
import {TableComponent} from "./components/table/table.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "registrate",
    component: RegistrateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
