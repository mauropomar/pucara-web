import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {GlobalService} from "../../services/global.service";
import {UserModel} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {UploadService} from "../../services/upload.service";
import {LoginService} from "../../services/login.service";
import {UtilService} from "../../services/util.service";

@Component({
    selector: 'app-formusers',
    templateUrl: './formusers.component.html',
    styleUrls: ['./formusers.component.css']
})
export class FormusersComponent implements OnInit {
    editando: boolean = false;
    title: string = 'Nuevo Usuario';
    showLoading: boolean = false;
    forma: FormGroup;
    public url: string;
    public token: string;
    public file: any;
    public ischangeImage: boolean = false;
    public user: UserModel = new class implements UserModel {
        name: string;
        username: string;
        email: string;
        rol: string = '1';
        password: string;
        phone: string;
        adreess:string;
        confirm_password: string;
        password_anterior: string;
        image: any;
    };

    constructor(private activateRoute: ActivatedRoute,
                private global: GlobalService,
                private router: Router,
                private userService: UsersService,
                private loginService: LoginService,
                private uploadService: UploadService,
                private util: UtilService) {
        this.url = global.url;
        this.token = this.loginService.getToken();
        this.activateRoute.params.subscribe(params => {
            this.editando = this.global.editando;
            this.title = 'Nuevo Usuario';
            if (params['id'] != 'nuevo') {
                this.global.editando = true;
                this.editando = this.global.editando;
                this.title = 'Editar Usuario';
                let id = params['id'];
                this.obtener(id);
            }
        })


    }

    ngOnInit(): void {
        this.global.title = 'Usuarios';
    }

    preview(files) {
        if (files.length === 0)
            return;
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            //  this.message = "Only images are supported.";
            return;
        }
        var reader = new FileReader();
        this.file = files;
        reader.readAsDataURL(files[0]);
        this.ischangeImage = true;
        reader.onload = (_event) => {
            this.user.image = reader.result;
        }
    }

    insertar(cerrar) {
        if (this.user.password != this.user.confirm_password) {
            this.util.showNotification('pe-7s-info', 'error', 'Las contraseñas mo coinciden.');
            return;
        }
        ;
        if (this.editando === true) {
            this.modificar();
            return;
        }
        this.showLoading = true;
        this.userService.register(this.user)
            .subscribe((data: any) => {
                this.showLoading = false;
                if (data.success === true) {
                    this.util.showNotification('pe-7s-check', 'info', data.message);
                    this.uploadImage(data, cerrar);
                    this.resetFields();
                } else {
                    this.util.showNotification('pe-7s-info', 'error', data.message);
                }
            }, (error) => {
                let message = 'Ha ocurrido un error al realizar la operación. Puede que la imagen del usuario sea demasiado grande.';
                this.util.showNotification('pe-7s-info', 'error', message);
            })
    }

    modificar() {
        if (this.user.password != this.user.confirm_password) {
            this.util.showNotification('pe-7s-info', 'error', 'Las contraseñas mo coinciden.');
            return;
        }
        ;
        this.showLoading = true;
        this.userService.update(this.user)
            .subscribe((data: any) => {
                this.showLoading = false;
                if (data.success === true) {
                    this.util.showNotification('pe-7s-check', 'info', data.message);
                    this.uploadImage(data, true);
                } else {
                    this.util.showNotification('pe-7s-info', 'error', data.message);
                }
            }, (error) => {
                this.showLoading = false;
                let message = 'Ha ocurrido un error al realizar la operación. Puede que la imagen del usuario sea demasiado grande.';
                this.util.showNotification('pe-7s-info', 'error', message);
            })
    }

    uploadImage(data, cerrar) {
        let url = this.url + 'upload-image-user/' + data.user._id;
        if (!this.file) {
            if (cerrar) {
                this.router.navigate(['home/users/1']);
            }

        }
        this.uploadService.makeFileRequest(url, [], this.file, this.token, 'image')
            .then((result: any) => {
                if (cerrar) {
                    this.user.image = result.user.imagen;
                    this.router.navigate(['home/users/1']);
                    return;
                }
            });
    }

    obtener(id) {
        this.userService.getOne(id)
            .subscribe(data => {
                this.user = data[0];
                this.user.confirm_password = data[0].password;
                this.user.password_anterior = data[0].password;
            })
    }

    resetFields() {
        this.user.name = '';
        this.user.username = '';
        this.user.email = '';
        this.user.rol = '1';
        this.user.phone = '';
        this.user.password = '';
        this.user.confirm_password = '';
        this.user.image = '../../../assets/img/default-user.png';
    }

}
