import {Component, OnInit} from '@angular/core';
import {BrandService} from "../../services/brand.service";
import {GlobalService} from "../../services/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

declare var $: any;

@Component({
  selector: 'app-listbrands',
  templateUrl: './listbrands.component.html',
  styleUrls: ['./listbrands.component.css']
})
export class ListbrandsComponent implements OnInit {

  public messagedelete: string = "Esta seguro que desea eliminar la marca seleccionada?"
  public brands: any = [];
  public brandselect: any = [];
  public url: string;

  constructor(private service: BrandService, private global: GlobalService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private util: UtilService) {
    this.url = this.global.url;
  }

  ngOnInit(): void {
    this.global.title = 'Marcas';
    //  this.getTable();
    this.actualPage();
  }

  create() {
    this.global.editando = false;
    this.router.navigate(['home/brand/new']);
  }

  actualPage() {
    this.activatedRoute.params.subscribe(params => {
      this.getAll(true);
    })
  }

  getAll(active) {
    this.service.getAll(active)
        .subscribe(data => {
          this.brands = data;
        })
  }

  edit(user) {
    this.global.editando = true;
    let id = user._id;
    this.router.navigate(['home/brand', id]);
  }

  delete() {
    let user = this.brandselect
    this.service.delete(user)
        .subscribe((data: any) => {
          if (data.success == true) {
            this.util.showNotification('pe-7s-check', 'success', data.message);
            this.deleteOfArray();
          }
        }, (error) => {
          this.util.showNotification('pe-7s-info', 'error', 'Ha ocurrido un error al intentar borrar el usuario.');
        })
  }

  showConfirmDelete(user) {
    $('#modalConfirmDelete').modal("show");
    this.brandselect = user;
  }

  deleteOfArray() {
    let myArray = this.brands;
    let id = this.brandselect._id;
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i]._id === id) {
        myArray.splice(i, 1);
        break
      }
    }
  }

  showOnlyActive($event: boolean) {
    this.service.getAll($event)
        .subscribe(data => {
          this.brands = data;
        })
  }
}
