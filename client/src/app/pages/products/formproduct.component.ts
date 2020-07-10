import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {GlobalService} from "../../services/global.service";
import {ProductModel} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {LoginService} from "../../services/login.service";
import {UtilService} from "../../services/util.service";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-formproduct',
  templateUrl: './formproduct.component.html',
  styleUrls: ['./formproduct.component.css']
})
export class FormproductComponent implements OnInit {
  editando: boolean = false;
  title: string = 'Nuevo Producto';
  showLoading: boolean = false;
  forma: FormGroup;
  public url: string;
  public token: string;
  public file: any;
  public ischangeImage: boolean = false;
  public prod: ProductModel = new class implements ProductModel {
    code:string;
    name:string;
    description:string;
    brand:string;
    uom:string;
    price:number;
    discount:number;
    duodate: any;
    recomended:boolean;
    mostused:boolean;
    volume:number;
    weight:number;
    minstock:number;
    tarifa:string;
    available:number;
    maxwidth:number;
    minheight:number;
    maxlenght:number;
    caracterist:string;
    image:any;
    active:boolean = true
  };
  constructor(private activateRoute: ActivatedRoute,
              private global: GlobalService,
              private router: Router,
              private service: ProductService,
              private loginService: LoginService,
              private uploadService: UploadService,
              private util: UtilService) {
      this.url = global.url;
      this.token = this.loginService.getToken();
      this.activateRoute.params.subscribe(params => {
          this.editando = this.global.editando;
          this.title = 'Nuevo Producto';
          this.resetFields();
          if (params['id']) {
              this.global.editando = true;
              this.editando = this.global.editando;
              this.title = 'Editar Producto';
              let id = params['id'];
              this.getOne(id);
          }
      })

      this.forma = new FormGroup({
          code: new FormControl('', [Validators.required, Validators.minLength(1)]),
          name: new FormControl('', [Validators.required, Validators.minLength(5)]),
          price:new FormControl('', [Validators.required]),
          discount:new FormControl('', [Validators.required]),
          description: new FormControl(''),
          recomended: new FormControl(''),
          mostused: new FormControl(''),
          duodate:new FormControl(''),
          volume:new FormControl(''),
          minstock:new FormControl(''),
          weight:new FormControl(''),
          tarifa: new FormControl(''),
          available: new FormControl(''),
          maxwidth: new FormControl(''),
          maxlenght: new FormControl(''),
          minheight: new FormControl(''),
          caracterist: new FormControl(''),
          active: new FormControl('')
      })
  }

  ngOnInit(): void {
      this.global.title = 'Productos';
  }

  preview(files) {
      if (files.length === 0)
          return;
      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
          //  this.message = "Only images are supported.";
          return;
      }
      var reader = new FileReader();
      this.file = files;
      reader.readAsDataURL(files[0]);
      this.ischangeImage = true;
      reader.onload = (_event) => {
          this.prod.image = reader.result;
      }
  }

  insert(cerrar) {
      if (this.editando === true) {
          this.update();
          return;
      }
      this.showLoading = true;
      this.service.register(this.prod)
          .subscribe((data: any) => {
              this.showLoading = false;
              if (data.success === true) {
                  this.util.showNotification('pe-7s-check', 'success', data.message);
                  this.uploadImage(data, cerrar);
                  this.resetFields();
              } else {
                  this.util.showNotification('pe-7s-info', 'danger', data.message);
              }
          }, (error) => {
              let message = 'Ha ocurrido un error al realizar la operación. Puede que la imagen del producto sea demasiado grande.';
              this.util.showNotification('pe-7s-info', 'danger', message);
          })
  }

  update() {
      this.showLoading = true;
      this.service.update(this.prod)
          .subscribe((data: any) => {
              this.showLoading = false;
              if (data.success === true) {
                  this.util.showNotification('pe-7s-check', 'success', data.message);
                  this.uploadImage(data, true);
              } else {
                  this.util.showNotification('pe-7s-info', 'danger', data.message);
              }
          }, (error) => {
              this.showLoading = false;
              let message = 'Ha ocurrido un error al realizar la operación. Puede que la imagen del producto sea demasiado grande.';
              this.util.showNotification('pe-7s-info', 'danger', message);
          })
  }

  uploadImage(data, cerrar) {
      let url = this.url + 'upload-image-product/' + data.datos._id;
      if (!this.file) {
          if (cerrar) {
              this.router.navigate(['home/products/1']);
          }

      }
      this.uploadService.makeFileRequest(url, [], this.file, this.token, 'image')
          .then((result: any) => {
              if (cerrar) {
                  this.prod.image = result.language.image;
                  this.router.navigate(['home/products/1']);
                  return;
              }
          });
  }

  cancel() {
      this.router.navigate(["home/products/1"]);
  }

  getOne(id) {
      this.service.getOne(id)
          .subscribe(data => {
              this.prod = data;
          })
  }

  resetFields() {
      this.prod.code = '';
      this.prod.name = '';
      this.prod.brand = '';
      this.prod.uom = '';
      this.prod.available = null;
      this.prod.discount = null;
      this.prod.duodate = new Date();
      this.prod.maxwidth = null;
      this.prod.maxlenght = null;
      this.prod.recomended = false;
      this.prod.minstock = null;
      this.prod.description = '';
      this.prod.caracterist = '';
      this.prod.image = null;
  }

}
