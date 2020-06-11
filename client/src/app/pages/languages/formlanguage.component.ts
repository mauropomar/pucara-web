import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {GlobalService} from "../../services/global.service";
import {LanguageModel} from "../../models/language";
import {LanguageService} from "../../services/language.service";
import {UploadService} from "../../services/upload.service";
import {LoginService} from "../../services/login.service";
import {UtilService} from "../../services/util.service";

@Component({
    selector: 'app-formlanguage',
    templateUrl: './formlanguage.component.html',
    styleUrls: ['./formlanguage.component.css']
})
export class FormlanguageComponent implements OnInit {
    editando: boolean = false;
    title: string = 'Nuevo Idioma';
    showLoading: boolean = false;
    forma: FormGroup;
    public url: string;
    public token: string;
    public file: any;
    public ischangeImage: boolean = false;
    public lang: LanguageModel = new class implements LanguageModel {
        code: string;
        name: string;
        description: string;
        flag: any;
        active: boolean = true
    };
    constructor(private activateRoute: ActivatedRoute,
                private global: GlobalService,
                private router: Router,
                private langService: LanguageService,
                private loginService: LoginService,
                private uploadService: UploadService,
                private util: UtilService) {
        this.url = global.url;
        this.token = this.loginService.getToken();
        this.activateRoute.params.subscribe(params => {
            this.editando = this.global.editando;
            this.title = 'Nuevo Idioma';
            this.resetFields();
            if (params['id']) {
                this.global.editando = true;
                this.editando = this.global.editando;
                this.title = 'Editar Idioma';
                let id = params['id'];
                this.getOne(id);
            }
        })

        this.forma = new FormGroup({
            code: new FormControl('', [Validators.required, Validators.minLength(1)]),
            name: new FormControl('', [Validators.required, Validators.minLength(5)]),
            description: new FormControl(''),
            active: new FormControl('')
        })

    }

    ngOnInit(): void {
        this.global.title = 'Idiomas';
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
            this.lang.flag = reader.result;
        }
    }

    insert(cerrar) {
        if (this.editando === true) {
            this.update();
            return;
        }
        this.showLoading = true;
        this.langService.register(this.lang)
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
        this.langService.update(this.lang)
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
        let url = this.url + 'upload-image-language/' + data.datos._id;
        if (!this.file) {
            if (cerrar) {
                this.router.navigate(['home/languages/1']);
            }

        }
        this.uploadService.makeFileRequest(url, [], this.file, this.token, 'flag')
            .then((result: any) => {
                if (cerrar) {
                    this.lang.flag = result.language.flag;
                    this.router.navigate(['home/languages/1']);
                    return;
                }
            });
    }

    cancel() {
        this.router.navigate(["home/languages/1"]);
    }

    getOne(id) {
        this.langService.getOne(id)
            .subscribe(data => {
                this.lang = data;
            })
    }

    resetFields() {
        this.lang.code = '';
        this.lang.name = '';
        this.lang.description = '';
        this.lang.flag = null;
    }

}
