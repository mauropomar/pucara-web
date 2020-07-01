import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {GlobalService} from "../../services/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

declare var $: any;

@Component({
  selector: 'app-listcustomer',
  templateUrl: './listcustomer.component.html',
  styleUrls: ['./listcustomer.component.css']
})
export class ListcustomerComponent implements OnInit {
  public messagedelete: string = "Esta seguro que desea eliminar el cliente seleccionado?"
  public customers: any = [];
  public customerselect: any = [];
  public url: string;

  constructor(private service: CustomerService, private global: GlobalService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private util: UtilService) {
      this.url = this.global.url;
  }

  ngOnInit(): void {
      this.global.title = 'Categorías de Productos';
      //  this.getTable();
      this.actualPage();
  }

  create() {
      this.global.editando = false;
      this.router.navigate(['home/customer/new']);
  }

  actualPage() {
      this.activatedRoute.params.subscribe(params => {
          this.getAll(true);
      })
  }

  getAll(active) {
      this.service.getAll(active)
          .subscribe(data => {
              this.customers = data;
          })
  }

  edit(user) {
      this.global.editando = true;
      let id = user._id;
      this.router.navigate(['home/customer', id]);
  }

  delete() {
      let user = this.customerselect
      this.service.delete(user)
          .subscribe((data: any) => {
              if (data.success == true) {
                  this.util.showNotification('pe-7s-check', 'success', data.message);
                  this.deleteOfArray();
              }
          }, (error) => {
              this.util.showNotification('pe-7s-info', 'error', 'Ha ocurrido un error al intentar borrar la categoría de producto.');
          })
  }

  showConfirmDelete(user) {
      $('#modalConfirmDelete').modal("show");
      this.customerselect = user;
  }

  deleteOfArray() {
      let myArray = this.customers;
      let id = this.customerselect._id;
      for (let i = 0; i < myArray.length; i++) {
          if (myArray[i]._id === id) {
              myArray.splice(i, 1);
              break
          }
      }
  }

  showOnlyActive(active) {
      this.service.getAll(active)
          .subscribe(data => {
              this.customers = data;
          })
  }
}
