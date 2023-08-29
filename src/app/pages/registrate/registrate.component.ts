import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {registerModel} from "../../models/register";
import {AdminService} from "../../services/admin.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.scss']
})
export class RegistrateComponent {

  user : Array<registerModel>
  loading: boolean = false;
  formUser: FormGroup

  constructor(private fb:FormBuilder , private userService:AdminService, private router:Router) {
    this.formUser = fb.group({
      name : new FormControl('',[Validators.required]),
      lastname : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    })
  }
  // Crear usuario
  saveUser(){
    if (this.formUser.valid){
      let user = new registerModel()
      user.nombre = this.formUser.get('name')?.value
      user.apellido = this.formUser.get('lastname')?.value
      user.email = this.formUser.get('email')?.value
      user.contrasena = this.formUser.get('password')?.value
      this.userService.createUser(user).subscribe(res =>{
        this.formUser.reset()
        this.load()
        this.showPopup('Registro exitoso!');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      })
    } else {
      this.showPopup('Error en el registro')
    }
  }
  showPopup(message: string) {

    // Crea el elemento div para el popup
    const popup = document.createElement('div');
    popup.classList.add('popup-bg');
    const content = document.createElement('div');
    content.classList.add('popup-content');
    content.innerText = message;
    popup.appendChild(content);

    // Establece estilos CSS mejorados
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';

    // Nuevos estilos
    popup.style.width = '80%';
    popup.style.maxWidth = '500px';
    popup.style.background = '#fff';
    popup.style.borderRadius = '10px';
    popup.style.padding = '20px 30px';
    popup.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.25)';

    content.style.fontFamily = 'Arial';
    content.style.fontSize = '18px';
    content.style.textAlign = 'center';
    // Agrega el popup al body
    document.body.appendChild(popup);

    // Remueve el popup después de 3 segundos
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 3000);

  }
  loginPage(){
    this.router.navigate(['/login'])
  }
  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 3000);
  }
}
