import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {GlobalService} from "../../services/global.service";
import {CategoryProdModel} from "../../models/category-prod";
import {UtilService} from "../../services/util.service";
import {CategoryProdService} from "../../services/category-prod.service";

@Component({
  selector: 'app-formcategory-prod',
  templateUrl: './formcategory-prod.component.html',
  styleUrls: ['./formcategory-prod.component.css']
})
export class FormcategoryProdComponent implements OnInit {
  editando: boolean = false;
  title: string = 'Nueva Categoria de Producto';
  showLoading: boolean = false;
  forma: FormGroup;
  public url: string;
  public token: string;
  public category: CategoryProdModel = new class implements CategoryProdModel {
    name: string;
    description: string;
    active:boolean=true;
  };

  constructor(private activateRoute: ActivatedRoute,
              private global: GlobalService,
              private router: Router,
              private service: CategoryProdService,
              private util: UtilService) {
    this.url = global.url;
    this.activateRoute.params.subscribe(params => {
      this.editando = this.global.editando;
      this.title = 'Nueva Categoría de Producto';
      this.resetFields();

      if (params['id']) {
        this.global.editando = true;
        this.editando = this.global.editando;
        this.title = 'Editar Categoría de Producto';
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
    this.service.getOne(id)
        .subscribe(data => {
          this.category = data;
        })
  }

  insert(cerrar) {
    if (this.editando === true) {
      this.update();
      return;
    }
    this.showLoading = true;
    this.service.register(this.category)
        .subscribe((data: any) => {
          this.showLoading = false;
          if (data.success === true) {
            this.util.showNotification('pe-7s-check', 'success', data.message);
            this.resetFields();
            if (cerrar)
              this.router.navigate(["home/categoryprods/1"]);
          } else {
            this.util.showNotification('pe-7s-info', 'danger', data.message);
          }
        })
  }

  update() {
    this.showLoading = true;
    this.service.update(this.category)
        .subscribe((data: any) => {
          this.showLoading = false;
          if (data.success === true) {
            this.router.navigate(["home/categoryprods/1"]);
            this.util.showNotification('pe-7s-check', 'success', data.message);
          } else {
            this.util.showNotification('pe-7s-info', 'danger', data.message);
          }
        })
  }


  cancel() {
    this.router.navigate(["home/categoryprods/1"]);
  }

  resetFields() {
    this.category.name = '';
    this.category.description = '';
  }

}
