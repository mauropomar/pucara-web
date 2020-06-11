import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {GlobalService} from "../../services/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

declare var $: any;

@Component({
  selector: 'app-listlanguages',
  templateUrl: './listlanguages.component.html',
  styleUrls: ['./listlanguages.component.css']
})
export class ListlanguagesComponent implements OnInit {

  public messagedelete: string = "Esta seguro que desea eliminar el idioma seleccionado?"
  public languages: any = [];
  public langselect: any = [];
  public url: string;
  public pages;
  public page;
  public total;
  public nextpage;
  public prevpage;
  
  constructor(private service: LanguageService, private global: GlobalService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private util: UtilService) {
    this.url = this.global.url;
  }

  ngOnInit(): void {
    this.global.title = 'Idioma';
    //  this.getTable();
    this.actualPage();
  }

  create() {
    this.global.editando = false;
    this.router.navigate(['home/language/new']);
  }

  actualPage() {
    this.activatedRoute.params.subscribe(params => {
      this.getAll(true);
    })
  }

  getAll(active) {
    this.service.getAll(active)
        .subscribe(data => {
          this.languages = data;
        })
  }

  edit(user) {
    this.global.editando = true;
    let id = user._id;
    this.router.navigate(['home/language', id]);
  }

  delete() {
    let user = this.langselect
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
    this.langselect = user;
  }

  deleteOfArray() {
    let myArray = this.languages;
    let id = this.langselect._id;
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
          this.languages = data;
        })
  }

  previous() {
    this.router.navigate(['home/languages', this.prevpage]);
  }

  next() {
    this.router.navigate(['home/languages', this.nextpage]);
  }
}
