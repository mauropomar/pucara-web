import {Component, OnInit} from '@angular/core';
import {CategoryProdService} from "../../services/category-prod.service";
import {GlobalService} from "../../services/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

declare var $: any;

@Component({
    selector: 'app-category-prod',
    templateUrl: './listcategory-prod.component.html',
    styleUrls: ['./listcategory-prod.component.css']
})
export class ListcategoryProdComponent implements OnInit {
    public messagedelete: string = "Esta seguro que desea eliminar la categoría seleccionada?"
    public categories: any = [];
    public categoryselect: any = [];
    public url: string;

    constructor(private service: CategoryProdService, private global: GlobalService,
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
        this.router.navigate(['home/categoryprod/new']);
    }

    actualPage() {
        this.activatedRoute.params.subscribe(params => {
            this.getAll(true);
        })
    }

    getAll(active) {
        this.service.getAll(active)
            .subscribe(data => {
                this.categories = data;
            })
    }

    edit(user) {
        this.global.editando = true;
        let id = user._id;
        this.router.navigate(['home/categoryprod', id]);
    }

    delete() {
        let user = this.categoryselect
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
        this.categoryselect = user;
    }

    deleteOfArray() {
        let myArray = this.categories;
        let id = this.categoryselect._id;
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
                this.categories = data;
            })
    }
}
