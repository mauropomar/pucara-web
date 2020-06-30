import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {GlobalService} from "../../services/global.service";
import {MenuModel} from "../../models/menu";
import {MenuService} from "../../services/menu.service";
import {UploadService} from "../../services/upload.service";
import {LoginService} from "../../services/login.service";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-formmenu',
  templateUrl: './formmenu.component.html',
  styleUrls: ['./formmenu.component.css']
})
export class FormmenuComponent implements OnInit {
  editando: boolean = false;
    title: string = 'Nuevo Menú';
    showLoading: boolean = false;
    forma: FormGroup;
    public url: string;
    public token: string;
    public file: any;
    public ischangeImage: boolean = false;
    public menu: MenuModel = new class implements MenuModel {
        name: string;
        description: string;
        menu:string;
        language:string;
        image: any;
        active: boolean = true
    };
    constructor(private activateRoute: ActivatedRoute,
                private global: GlobalService,
                private router: Router,
                private menuService: MenuService,
                private loginService: LoginService,
                private uploadService: UploadService,
                private util: UtilService) {
        this.url = global.url;       
        this.token = this.loginService.getToken();
        this.activateRoute.params.subscribe(params => {
            this.editando = this.global.editando;
            this.title = 'Nuevo Menú';
            this.resetFields();
            this.menu.language = params['lang'];
            if (params['id']) {
                this.global.editando = true;
                this.editando = this.global.editando;
                this.title = 'Editar Menú';
                let id = params['id'];
                this.getOne(id);
            }
        })

        this.forma = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(5)]),
            description: new FormControl(''),
            active: new FormControl('')
        })

    }

    ngOnInit(): void {
        this.global.title = 'Menú';
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
            this.menu.image = reader.result;
        }
    }

    insert(cerrar) {
        if (this.editando === true) {
            this.update();
            return;
        }
        this.showLoading = true;
        this.menuService.register(this.menu)
            .subscribe((data: any) => {
                this.showLoading = false;
                if (data.success === true) {
                    this.util.showNotification('pe-7s-check', 'success', data.message);
                    this.uploadImage(data, cerrar);
                    this.resetFields();
                } else {
                    this.util.showNotification('pe-7s-info', 'danger', data.message);
                }
            }, (error) => {
                let message = 'Ha ocurrido un error al realizar la operación. Puede que la imagen de la bandera sea demasiado grande.';
                this.util.showNotification('pe-7s-info', 'danger', message);
            })
    }

    update() {
        this.showLoading = true;
        this.menuService.update(this.menu)
            .subscribe((data: any) => {
                this.showLoading = false;
                if (data.success === true) {
                    this.util.showNotification('pe-7s-check', 'success', data.message);
                    this.uploadImage(data, true);
                } else {
                    this.util.showNotification('pe-7s-info', 'danger', data.message);
                }
            }, (error) => {
                this.showLoading = false;
                let message = 'Ha ocurrido un error al realizar la operación. Puede que la imagen de la bandera del idioma sea demasiado grande.';
                this.util.showNotification('pe-7s-info', 'danger', message);
            })
    }

    uploadImage(data, cerrar) {
        let url = this.url + 'upload-image-menu/' + data.datos._id;
        if (!this.file) {
            if (cerrar) {
                this.router.navigate(['home/menus/1']);
            }

        }
        this.uploadService.makeFileRequest(url, [], this.file, this.token, 'image')
            .then((result: any) => {
                if (cerrar) {
                    this.menu.image = result.menu.image;
                    this.router.navigate(['home/menus/1']);
                    return;
                }
            });
    }

    cancel() {
        this.router.navigate(["home/menus/1"]);
    }

    getOne(id) {
        this.menuService.getOne(id)
            .subscribe(data => {
                this.menu = data;
            })
    }

    resetFields() {
        this.menu.name = '';
        this.menu.description = '';
        this.menu.image = null;
    }

}
