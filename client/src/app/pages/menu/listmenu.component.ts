import { Component, OnInit } from '@angular/core';
import { MenuService } from "../../services/menu.service";
import { GlobalService } from "../../services/global.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilService } from "../../services/util.service";

declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './listmenu.component.html',
  styleUrls: ['./listmenu.component.css']
})
export class ListmenuComponent implements OnInit {
  public messagedelete: string = "Esta seguro que desea eliminar el menú seleccionado?"
  public menus: any = [];
  public menuselect: any = [];
  public url: string;
  // public languageId: string = '';
  public active: boolean = true;

  constructor(private service: MenuService, private global: GlobalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private util: UtilService) {
    this.url = this.global.url;
  }

  ngOnInit(): void {
    this.global.title = 'Menú';
    //  this.getTable();
     this.getAll();

  }

  create() {
    this.global.editando = false;
    this.router.navigate(['home/menu/new', this.global.languageId]);
  }

  getAll() {
    if (this.global.languageId == '')
      return;
    this.service.getAll(this.global.languageId, this.active)
      .subscribe(data => {
        this.menus = data;
      })
  }

  edit(user) {
    this.global.editando = true;
    let id = user._id;
    this.router.navigate(['home/menu', id, this.global.languageId]);
  }

  delete() {
    let user = this.menuselect
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
    this.menuselect = user;
  }

  deleteOfArray() {
    let myArray = this.menus;
    let id = this.menuselect._id;
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i]._id === id) {
        myArray.splice(i, 1);
        break
      }
    }
  }

  showOnlyActive($event: boolean) {
    this.active = $event;
    this.service.getAll(this.global.languageId, $event)
      .subscribe(data => {
        this.menus = data;
      })
  }
}
