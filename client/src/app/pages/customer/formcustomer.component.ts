import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GlobalService } from "../../services/global.service";
import { CustomerModel } from "../../models/customer";
import { UtilService } from "../../services/util.service";
import { CustomerService } from "../../services/customer.service";

@Component({
  selector: 'app-formcustomer',
  templateUrl: './formcustomer.component.html',
  styleUrls: ['./formcustomer.component.css']
})
export class FormcustomerComponent implements OnInit {
  editando: boolean = false;
  title: string = 'Nuevo Cliente';
  showLoading: boolean = false;
  forma: FormGroup;
  public url: string;
  public token: string;
  public customer: CustomerModel = new class implements CustomerModel {
    code: string;
    name: string;
    description: string;
    credit: number;
    deactivationDate: Date;
    deactivationReason: string;
    active: boolean = true;
  };

  constructor(private activateRoute: ActivatedRoute,
    private global: GlobalService,
    private router: Router,
    private service: CustomerService,
    private util: UtilService) {
    this.url = global.url;
    this.activateRoute.params.subscribe(params => {
      this.editando = this.global.editando;
      this.resetFields();
      if (params['id']) {
        this.global.editando = true;
        this.editando = this.global.editando;
        this.title = 'Editar Cliente';
        let id = params['id'];
        this.getOne(id);
      }
    })
    this.forma = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(2)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      credit: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      deactivationDate: new FormControl('', [Validators.required]),
      deactivationReason: new FormControl(''),
      active: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  getOne(id) {
    this.service.getOne(id)
      .subscribe(data => {
        this.customer = data;
      })
  }

  insert(cerrar) {
    if (this.editando === true) {
      this.update();
      return;
    }
    this.showLoading = true;
    this.service.register(this.customer)
      .subscribe((data: any) => {
        this.showLoading = false;
        if (data.success === true) {
          this.util.showNotification('pe-7s-check', 'success', data.message);
          this.resetFields();
          if (cerrar)
            this.router.navigate(["home/customers/1"]);
        } else {
          this.util.showNotification('pe-7s-info', 'danger', data.message);
        }
      })
  }

  update() {
    this.showLoading = true;
    this.service.update(this.customer)
      .subscribe((data: any) => {
        this.showLoading = false;
        if (data.success === true) {
          this.router.navigate(["home/customers/1"]);
          this.util.showNotification('pe-7s-check', 'success', data.message);
        } else {
          this.util.showNotification('pe-7s-info', 'danger', data.message);
        }
      })
  }


  cancel() {
    this.router.navigate(["home/customers/1"]);
  }

  resetFields() {
    this.customer.code = '';
    this.customer.name = '';
    this.customer.description = '';
    this.customer.deactivationReason = '';
    this.customer.credit = null;
    this.customer.deactivationDate = new Date();
  }

}
