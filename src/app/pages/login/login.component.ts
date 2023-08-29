import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Login} from "../../models/login";
import {AdminService} from "../../services/admin.service";
import {Router} from "@angular/router";
import {Message} from "primeng/api";
import {catchError, tap, throwError} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  login : Array<Login>
  loading: boolean = false;
  messages1: Message[] = [];
  messageSuccess: Message[] = [];
  formLogin: FormGroup


  constructor(private fb:FormBuilder , private loginService:AdminService, private router:Router) {
    this.formLogin = fb.group({
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    })
  }


  loginUser() {
    if (this.formLogin.valid) {
      let login = new Login();
      login.email = this.formLogin.get('email')?.value;
      login.password = this.formLogin.get('password')?.value;
      this.loginService.loginUser(login).pipe(
        tap(res => {
          this.formLogin.reset();
          this.load();
          this.success()
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);
        }),
        catchError(error => {
          if (error.status === 409) {
            this.message();
            console.log('Error 409: Conflict');
          } else {
            // Manejo de otros errores
            console.error('Otro error:', error);
          }
          return throwError(error); // Re-lanza el error
        })
      ).subscribe();
    } else if (this.formLogin.invalid) {
      this.message();
    }
  }
  register(){
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

  ngOnInit(): void {
  }
  message(){
    this.messages1 = [
      { severity: 'error', summary: 'Error', detail: 'Credenciales incorrectas' },
    ];
    setTimeout(() => {
      this.messages1 = [];
    }, 2000);
  }
  success(){
    this.messageSuccess =[
      { severity: 'success', summary: 'Success', detail: 'Login exitoso!' },
    ];
  }

}
