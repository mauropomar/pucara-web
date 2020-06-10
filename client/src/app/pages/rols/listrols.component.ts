import { Component, OnInit } from '@angular/core';
import {RolService} from "../../services/rols.service";
import {GlobalService} from "../../services/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

declare var $: any;
@Component({
  selector: 'app-listrols',
  templateUrl: './listrols.component.html',
  styleUrls: ['./listrols.component.css']
})
export class ListrolsComponent implements OnInit {

  public messagedelete: string = "Esta seguro que desea eliminar el rol seleccionado?"
  public rols: any = [];
  public rolselect: any = [];
  public url: string;

  constructor(private service:RolService, private global:GlobalService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private util: UtilService) {
    this.url = this.global.url;
  }

  ngOnInit(): void {
    this.global.title = 'Role';
    //  this.getTable();
    this.actualPage();
  }

  create() {
    this.global.editando = false;
    this.router.navigate(['home/rol/new']);
  }

  actualPage() {
    this.activatedRoute.params.subscribe(params => {
      this.getAll(true);
    })
  }

  getAll(active) {
    this.service.getAll(active)
        .subscribe(data => {
          this.rols = data;
        })
  }

  edit(user) {
    this.global.editando = true;
    let id = user._id;
    this.router.navigate(['home/rol', id]);
  }

  delete() {
    let user = this.rolselect
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
    this.rolselect = user;
  }

  deleteOfArray() {
    let myArray = this.rols;
    let id = this.rolselect._id;
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i]._id === id) {
        myArray.splice(i, 1);
        break
      }
    }
  }
}
