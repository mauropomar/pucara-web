import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {GlobalService} from "../../services/global.service";
import {UmModel} from "../../models/um";
import {UmService} from "../../services/um.service";
import {LoginService} from "../../services/login.service";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-formum',
  templateUrl: './formum.component.html',
  styleUrls: ['./formum.component.css']
})
export class FormumComponent implements OnInit {
  editando: boolean = false;
  title: string = 'Nuevo Rol';
  showLoading: boolean = false;
  forma: FormGroup;
  public url: string;
  public token: string;
  public um: UmModel = new class implements UmModel {
      code: string;
      name: string;
      active:boolean=true;
  };

  constructor(private activateRoute: ActivatedRoute,
              private global: GlobalService,
              private router: Router,
              private umService: UmService,
              private loginService: LoginService,
              private util: UtilService) {
      this.url = global.url;
      this.token = this.loginService.getToken();
      this.activateRoute.params.subscribe(params => {
          this.editando = this.global.editando;
          this.title = 'Nueva Unidad de Medida';
       //   this.resetFields();

          if (params['id']) {
              this.global.editando = true;
              this.editando = this.global.editando;
              this.title = 'Editar Unidad de Medida';
              let id = params['id'];
              this.getOne(id);
          }
      })
      this.forma = new FormGroup({
          code: new FormControl('', [Validators.required]),
          name: new FormControl('',[Validators.required, Validators.minLength(3)]),
          active: new FormControl('')
      })
  }

  ngOnInit(): void {
  }

  getOne(id) {
      this.umService.getOne(id)
          .subscribe(data => {
              this.um = data;
          })
  }

  insert(cerrar) {
      if (this.editando === true) {
          this.update();
          return;
      }
      this.showLoading = true;
      this.umService.register(this.um)
          .subscribe((data: any) => {
              this.showLoading = false;
              if (data.success === true) {
                  this.util.showNotification('pe-7s-check', 'success', data.message);
                  this.resetFields();
                  if (cerrar)
                      this.router.navigate(["home/ums", 1]);
              } else {
                  this.util.showNotification('pe-7s-info', 'danger', data.message);
              }
          })
  }

  update() {
      this.showLoading = true;
      this.umService.update(this.um)
          .subscribe((data: any) => {
              this.showLoading = false;
              if (data.success === true) {
                  this.router.navigate(["home/ums", 1]);
                  this.util.showNotification('pe-7s-check', 'success', data.message);
              } else {
                  this.util.showNotification('pe-7s-info', 'danger', data.message);
              }
          })
  }


  cancel() {
      this.router.navigate(["home/ums", 1]);
  }

  resetFields() {
      this.um.name = '';
      this.um.code = '';
  }

}
