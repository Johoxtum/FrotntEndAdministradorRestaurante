import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Login} from "../../models/login";
import {AdminService} from "../../services/admin.service";
import {Router} from "@angular/router";
import {registerModel} from "../../models/register";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login : Array<Login>
  loading: boolean = false;
  loading1: boolean = false;

  formLogin: FormGroup


  constructor(private fb:FormBuilder , private loginService:AdminService, private router:Router) {
    this.formLogin = fb.group({
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    })
  }
  loginUser(){
    if (this.formLogin.valid){
      let login = new Login()
      login.email = this.formLogin.get('email')?.value
      login.password = this.formLogin.get('password')?.value
      this.loginService.loginUser(login).subscribe(res =>{
        this.formLogin.reset()
        this.load()
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      })
    } else {
      console.log("Login fallido")
    }
  }
  register(){

    this.loading1 = true
    setTimeout(() =>{
      this.loading1 = false
    }, 2000);
    this.router.navigate(['/registrate'])

  }
  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 3000);
  }
  get email(){
    return this.formLogin.controls['email']
  }
  get password(){
    return this.formLogin.controls['password']
  }

}
