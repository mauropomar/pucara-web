import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {GlobalService} from './global.service';
import {LoginService} from "./login.service";
import {MenuModel} from "../models/menu";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    public url: string;

    constructor(private http: HttpClient, public global: GlobalService,
                private loginService: LoginService) {
        this.url = global.url;
    }

    register(menu: MenuModel): Observable<any> {
        let params = JSON.stringify(menu);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'register-menu';
        return this.http.post(url, params, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }

    update(menu: MenuModel): Observable<any> {
        let params = JSON.stringify(menu);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'update-menu/' + menu['_id'];
        return this.http.put(url, params, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }

    getAll(langId, active) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let page = 1;
        let url = this.url + 'menus/' + page;
        let params = new HttpParams({
            fromObject: {
                languageId:langId,
                active: active
            }
        });
        return this.http.get(url, {headers: headers, params: params})
            .pipe(map(data => data['datos']));
    }

    getOne(id) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'menu/' + id;
        return this.http.get(url, {headers: headers})
            .pipe(map(data => data['datos']));
    }

    delete(menu) {
        let params = JSON.stringify(menu);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'delete-menu/' + menu['_id'];
        return this.http.delete(url, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }
}
