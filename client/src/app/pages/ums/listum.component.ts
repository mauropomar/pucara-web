import {Component, OnInit} from '@angular/core';
import {UmService} from "../../services/um.service";
import {GlobalService} from "../../services/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

declare var $: any;
@Component({
  selector: 'app-listum',
  templateUrl: './listum.component.html',
  styleUrls: ['./listum.component.css']
})
export class ListumComponent implements OnInit {

  public messagedelete: string = "Esta seguro que desea eliminar la unidad de medida seleccionada?"
    public ums: any = [];
    public rolselect: any = [];
    public url: string;

    constructor(private service: UmService, private global: GlobalService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private util: UtilService) {
        this.url = this.global.url;
    }

    ngOnInit(): void {
        this.global.title = 'Unidad de Medida';
        //  this.getTable();
        this.actualPage();
    }

    create() {
        this.global.editando = false;
        this.router.navigate(['home/um/new']);
    }

    actualPage() {
        this.activatedRoute.params.subscribe(params => {
            this.getAll(true);
        })
    }

    getAll(active) {
        this.service.getAll(active)
            .subscribe(data => {
                this.ums = data;
            })
    }

    edit(user) {
        this.global.editando = true;
        let id = user._id;
        this.router.navigate(['home/um', id]);
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
        let myArray = this.ums;
        let id = this.rolselect._id;
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
                this.ums = data;
            })
    }
}
