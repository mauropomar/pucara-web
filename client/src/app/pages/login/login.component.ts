import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from "../../services/login.service";
import {Router} from '@angular/router';
import {GlobalService} from "../../services/global.service";
import {LoginModel} from "../../models/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token;
  message = '';
  identity;
  user: LoginModel = new class implements LoginModel {
    email: string;
    password: string;
  };
  public showLoading: boolean = false;

  constructor(private loginservice: LoginService,
              private router: Router,
              private global: GlobalService) {
  }

  ngOnInit(): void {

  }

  onValidate(forma) {
    let error = forma.controls.email.errors;
    if (error && error.required == true) {
      this.message = 'Debe introducir un correo.'
      return false;
    }
    if (error && error.pattern) {
      this.message = 'Correo incorrecto.'
      return false;
    }
    error = forma.controls.password.errors;
    if (error && error.required == true) {
      this.message = 'Debe introducir una contraseña.'
      return false;
    }
    return true;
  }

  onSumit(forma: NgForm) {
    let validate = this.onValidate(forma);
    if (!validate)
      return;
    this.message = '';
    this.showLoading = true;
    this.loginservice.auth(this.user, true)
        .subscribe((data: any) => {
          this.identity = data.user;
          this.token = data.token;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          if (this.token.length <= 0) {
            this.message = 'Token Invalido';
          } else {
            localStorage.setItem('token', this.token);
          }
          this.global.userId = data.user._id;
          this.global.image = data.user.image;
         /* this.globales.esAdmin = (data.user.rol == this.globales.rolAdmin);
          this.globales.esOperador = (data.user.rol == this.globales.rolOperador);
          this.globales.esComercial = (data.user.rol == this.globales.rolComercial);
          this.globales.esSupervisor = (data.user.rol == this.globales.rolSupervisor);
          if (this.globales.esSupervisor || this.globales.esAdmin)
            this.router.navigate(['home/sucursales/1']);
          else
            this.router.navigate(['home/clientes/1']);

          */
          this.showLoading = false;
        }, (response) => {
          this.message = response.error.message;
          this.showLoading = false;
        })
  }

}






