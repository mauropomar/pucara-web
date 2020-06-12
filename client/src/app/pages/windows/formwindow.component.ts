import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {GlobalService} from "../../services/global.service";
import {WindowModel} from "../../models/window";
import {WindowService} from "../../services/window.service";
import {LoginService} from "../../services/login.service";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-formwindow',
  templateUrl: './formwindow.component.html',
  styleUrls: ['./formwindow.component.css']
})
export class FormwindowComponent implements OnInit {
  editando: boolean = false;
  title: string = 'Nuevo Window';
  showLoading: boolean = false;
  forma: FormGroup;
  public url: string;
  public token: string;
  public window: WindowModel = new class implements WindowModel {
    name: string;
    active:boolean=true;
  };

  constructor(private activateRoute: ActivatedRoute,
              private global: GlobalService,
              private router: Router,
              private windowService: WindowService,
              private loginService: LoginService,
              private util: UtilService) {
    this.url = global.url;
    this.token = this.loginService.getToken();
    this.activateRoute.params.subscribe(params => {
      this.editando = this.global.editando;
      this.title = 'Nueva Ventana';
      this.resetFields();

      if (params['id']) {
        this.global.editando = true;
        this.editando = this.global.editando;
        this.title = 'Editar Ventana';
        let id = params['id'];
        this.getOne(id);
      }
    })
    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      active: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  getOne(id) {
    this.windowService.getOne(id)
        .subscribe(data => {
          this.window = data;
        })
  }

  insert(cerrar) {
    if (this.editando === true) {
      this.update();
      return;
    }
    this.showLoading = true;
    this.windowService.register(this.window)
        .subscribe((data: any) => {
          this.showLoading = false;
          if (data.success === true) {
            this.util.showNotification('pe-7s-check', 'success', data.message);
            this.resetFields();
            if (cerrar)
              this.router.navigate(["home/windows", 1]);
          } else {
            this.util.showNotification('pe-7s-info', 'danger', data.message);
          }
        })
  }

  update() {
    this.showLoading = true;
    this.windowService.update(this.window)
        .subscribe((data: any) => {
          this.showLoading = false;
          if (data.success === true) {
            this.router.navigate(["home/windows", 1]);
            this.util.showNotification('pe-7s-check', 'success', data.message);
          } else {
            this.util.showNotification('pe-7s-info', 'danger', data.message);
          }
        })
  }


  cancel() {
    this.router.navigate(["home/windows", 1]);
  }

  resetFields() {
    this.window.name = '';
  }

}
