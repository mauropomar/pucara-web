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
        adreess: string;
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
            this.resetFields();
            if (params['id']) {
                this.global.editando = true;
                this.editando = this.global.editando;
                this.title = 'Editar Usuario';
                let id = params['id'];
                this.getOne(id);
            }
        })

        this.forma = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(5)]),
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl('', [Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
            phone:new FormControl(),
            adreess:new FormControl(),
            password:new FormControl('', Validators.required),
            confirmpassword:new FormControl()
        })
        this.forma.controls['password'].setValidators([
            Validators.required
        ])
         this.forma.controls['confirmpassword'].setValidators([
             Validators.required,
             this.noIgual.bind(this.forma)
         ])

    }

    ngOnInit(): void {
        this.global.title = 'Usuarios';
    }

    noIgual(control: FormControl, confirm): { [s: string]: boolean } {
        let forma: any = this;
        if (control.value != forma.controls['password'].value) {
            return {
                noiguales: true
            }
        }
        return null
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

    insert(cerrar) {
        if (this.user.password != this.user.confirm_password) {
            this.util.showNotification('pe-7s-info', 'error', 'Las contraseñas mo coinciden.');
            return;
        }
        ;
        if (this.editando === true) {
            this.update();
            return;
        }
        this.showLoading = true;
        this.userService.register(this.user)
            .subscribe((data: any) => {
                this.showLoading = false;
                if (data.success === true) {
                    this.util.showNotification('pe-7s-check', 'success', data.message);
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

    update() {
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
                    this.util.showNotification('pe-7s-check', 'success', data.message);
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
                this.router.navigate(['users/1']);
            }

        }
        this.uploadService.makeFileRequest(url, [], this.file, this.token, 'image')
            .then((result: any) => {
                if (cerrar) {
                    this.user.image = result.user.image;
                    this.router.navigate(['users/1']);
                    return;
                }
            });
    }

    cancel() {
        this.router.navigate(["users/1"]);
    }

    getOne(id) {
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
        this.user.rol = '5ed22b455c4d4f2504fbdc8d';
        this.user.phone = '';
        this.user.password = '';
        this.user.confirm_password = '';
        this.user.image = null;
    }

}
