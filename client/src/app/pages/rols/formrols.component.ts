import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {GlobalService} from "../../services/global.service";
import {RolModel} from "../../models/rol";
import {RolService} from "../../services/rols.service";
import {LoginService} from "../../services/login.service";
import {UtilService} from "../../services/util.service";
import {UsersService} from "../../services/users.service";
import {UploadService} from "../../services/upload.service";

@Component({
    selector: 'app-formrols',
    templateUrl: './formrols.component.html',
    styleUrls: ['./formrols.component.css']
})
export class FormrolsComponent implements OnInit {
    editando: boolean = false;
    title: string = 'Nuevo Rol';
    showLoading: boolean = false;
    forma: FormGroup;
    public url: string;
    public token: string;
    public file: any;
    public rol: RolModel = new class implements RolModel {
        name: string;
        description: string;
        active:boolean=true;
    };

    constructor(private activateRoute: ActivatedRoute,
                private global: GlobalService,
                private router: Router,
                private rolService: RolService,
                private loginService: LoginService,
                private util: UtilService) {
        this.url = global.url;
        this.token = this.loginService.getToken();
        this.activateRoute.params.subscribe(params => {
            this.editando = this.global.editando;
            this.title = 'Nuevo Rol';
            this.resetFields();

            if (params['id']) {
                this.global.editando = true;
                this.editando = this.global.editando;
                this.title = 'Editar Rol';
                let id = params['id'];
                this.getOne(id);
            }
        })
        this.forma = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2)]),
            description: new FormControl(''),
            active: new FormControl('')
        })
    }

    ngOnInit(): void {
    }

    getOne(id) {
        this.rolService.getOne(id)
            .subscribe(data => {
                this.rol = data;
            })
    }

    insert(cerrar) {
        if (this.editando === true) {
            this.update();
            return;
        }
        this.showLoading = true;
        this.rolService.register(this.rol)
            .subscribe((data: any) => {
                this.showLoading = false;
                if (data.success === true) {
                    this.util.showNotification('pe-7s-check', 'success', data.message);
                    this.resetFields();
                    if (cerrar)
                        this.router.navigate(["home/rols"]);
                } else {
                    this.util.showNotification('pe-7s-info', 'error', data.message);
                }
            })
    }

    update() {
        this.showLoading = true;
        this.rolService.update(this.rol)
            .subscribe((data: any) => {
                this.showLoading = false;
                if (data.success === true) {
                    this.router.navigate(["home/rols"]);
                    this.util.showNotification('pe-7s-check', 'success', data.message);
                } else {
                    this.util.showNotification('pe-7s-info', 'error', data.message);
                }
            })
    }


    cancel() {
        this.router.navigate(["home/rols"]);
    }

    resetFields() {
        this.rol.name = '';
        this.rol.description = '';
    }

}
