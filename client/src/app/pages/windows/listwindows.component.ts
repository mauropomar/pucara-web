import {Component, OnInit} from '@angular/core';
import {WindowService} from "../../services/window.service";
import {GlobalService} from "../../services/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

declare var $: any;
@Component({
  selector: 'app-windows',
  templateUrl: './listwindows.component.html',
  styleUrls: ['./listwindows.component.css']
})
export class ListwindowsComponent implements OnInit {
  public messagedelete: string = "Esta seguro que desea eliminar el rol seleccionado?"
  public windows: any = [];
  public windowselect: any = [];
  public url: string;

  constructor(private service: WindowService, private global: GlobalService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private util: UtilService) {
    this.url = this.global.url;
  }

  ngOnInit(): void {
    this.global.title = 'Ventana';
    //  this.getTable();
    this.actualPage();
  }

  create() {
    this.global.editando = false;
    this.router.navigate(['home/window/new']);
  }

  actualPage() {
    this.activatedRoute.params.subscribe(params => {
      this.getAll(true);
    })
  }

  getAll(active) {
    this.service.getAll(active)
        .subscribe(data => {
          this.windows = data;
        })
  }

  edit(user) {
    this.global.editando = true;
    let id = user._id;
    this.router.navigate(['home/window', id]);
  }

  delete() {
    let user = this.windowselect
    this.service.delete(user)
        .subscribe((data: any) => {
          if (data.success == true) {
            this.util.showNotification('pe-7s-check', 'success', data.message);
            this.deleteOfArray();
          }
        }, (error) => {
          this.util.showNotification('pe-7s-info', 'error', 'Ha ocurrido un error al intentar borrar la ventana.');
        })
  }

  showConfirmDelete(user) {
    $('#modalConfirmDelete').modal("show");
    this.windowselect = user;
  }

  deleteOfArray() {
    let myArray = this.windows;
    let id = this.windowselect._id;
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
          this.windows = data;
        })
  }
}
