import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {GlobalService} from "../../services/global.service";
import {UtilService} from "../../services/util.service";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";

declare var $: any;

@Component({
    selector: 'app-listusers',
    templateUrl: './listusers.component.html',
    styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
    public messagedelete: string = "Esta seguro que desea eliminar el usuario seleccionado?"
    public users: any = [];
    public userselect: any = [];
    public url: string;
    public pages;
    public page;
    public total;
    public nextpage;
    public prevpage;

    constructor(private service: UsersService,
                public global: GlobalService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private util: UtilService) {
        this.url = this.global.url;
    }

    ngOnInit(): void {
        this.global.title = 'Usuarios';
      //  this.getTable();
        this.actualPage();
    }

    create() {
        this.global.editando = false;
        this.router.navigate(['home/user/new']);
    }

    actualPage() {
        this.activatedRoute.params.subscribe(params => {
            let page = +params['page'];
            this.page = page;
            if (!page) {
                page = 1;
            } else {
                this.nextpage = page + 1;
                this.prevpage = page - 1;
                if (this.prevpage <= 0) {
                    this.prevpage = 1;
                }
            }
            this.page = page;
            this.getUsers(page);
        })
    }

    getUsers(page) {
        this.service.getAll(page)
            .subscribe(data => {
                this.users = data['datos'];
                this.total = data['total'];
                this.pages = data['pages'];
            })
    }

    edit(user) {
        this.global.editando = true;
        let id = user._id;
        this.router.navigate(['home/user', id]);
    }

    delete() {
        let user = this.userselect
        this.service.delete(user)
            .subscribe((data: any) => {
                if (data.success == true) {
                    this.util.showNotification('pe-7s-check', 'info', data.message);
                    this.deleteOfArray();
                }
            }, (error) => {
                this.util.showNotification('pe-7s-info', 'error', 'Ha ocurrido un error al intentar borrar el usuario.');
            })
    }

    showConfirmDelete(user) {
        $('#modalConfirmDelete').modal("show");
        this.userselect = user;
    }

    deleteOfArray() {
        let myArray = this.users;
        let id = this.userselect._id;
        for (let i = 0; i < myArray.length; i++) {
            if (myArray[i]._id === id) {
                myArray.splice(i, 1);
                break
            }
        }
    }

    previous() {
        this.router.navigate(['home/users', this.prevpage]);
    }

    next() {
        this.router.navigate(['home/users', this.nextpage]);
    }

}
