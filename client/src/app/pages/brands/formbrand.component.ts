import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {GlobalService} from "../../services/global.service";
import {BrandModel} from "../../models/brand";
import {BrandService} from "../../services/brand.service";
import {LoginService} from "../../services/login.service";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-formbrand',
  templateUrl: './formbrand.component.html',
  styleUrls: ['./formbrand.component.css']
})
export class FormbrandComponent implements OnInit {
  editando: boolean = false;
  title: string = 'Nuevo Rol';
  showLoading: boolean = false;
  forma: FormGroup;
  public url: string;
  public token: string;
  public brand: BrandModel = new class implements BrandModel {
    name: string;
    description: string;
    active:boolean=true;
  };

  constructor(private activateRoute: ActivatedRoute,
              private global: GlobalService,
              private router: Router,
              private rolService: BrandService,
              private loginService: LoginService,
              private util: UtilService) {
    this.url = global.url;
    this.token = this.loginService.getToken();
    this.activateRoute.params.subscribe(params => {
      this.editando = this.global.editando;
      this.title = 'Nuevo Marca';
      this.resetFields();

      if (params['id']) {
        this.global.editando = true;
        this.editando = this.global.editando;
        this.title = 'Editar Marca';
        let id = params['id'];
        this.getOne(id);
      }
    })
    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl(''),
      active: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  getOne(id) {
    this.rolService.getOne(id)
        .subscribe(data => {
          this.brand = data;
        })
  }

  insert(cerrar) {
    if (this.editando === true) {
      this.update();
      return;
    }
    this.showLoading = true;
    this.rolService.register(this.brand)
        .subscribe((data: any) => {
          this.showLoading = false;
          if (data.success === true) {
            this.util.showNotification('pe-7s-check', 'success', data.message);
            this.resetFields();
            if (cerrar)
              this.router.navigate(["home/brands", 1]);
          } else {
            this.util.showNotification('pe-7s-info', 'danger', data.message);
          }
        })
  }

  update() {
    this.showLoading = true;
    this.rolService.update(this.brand)
        .subscribe((data: any) => {
          this.showLoading = false;
          if (data.success === true) {
            this.router.navigate(["home/brands", 1]);
            this.util.showNotification('pe-7s-check', 'success', data.message);
          } else {
            this.util.showNotification('pe-7s-info', 'danger', data.message);
          }
        })
  }


  cancel() {
    this.router.navigate(["home/brands", 1]);
  }

  resetFields() {
    this.brand.name = '';
    this.brand.description = '';
  }

}
