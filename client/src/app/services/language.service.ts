import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {GlobalService} from './global.service';
import {LoginService} from "./login.service";
import {LanguageModel} from "../models/language";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    public url: string;

    constructor(private http: HttpClient, public global: GlobalService,
                private loginService: LoginService) {
        this.url = global.url;
    }

    register(language: LanguageModel): Observable<any> {
        let params = JSON.stringify(language);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'register-language';
        return this.http.post(url, params, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }

    update(language: LanguageModel): Observable<any> {
        let params = JSON.stringify(language);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'update-language/' + language['_id'];
        return this.http.put(url, params, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }

    getAll(active) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let page = 1;
        let url = this.url + 'languages/' + page;
        let params = new HttpParams({
            fromObject: {
                active: active
            }
        });
        return this.http.get(url, {headers: headers, params: params})
            .pipe(map(data => data['datos']));
    }

    getOne(id) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'language/' + id;
        return this.http.get(url, {headers: headers})
            .pipe(map(data => data['datos']));
    }

    delete(language) {
        let params = JSON.stringify(language);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'delete-language/' + language['_id'];
        return this.http.delete(url, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }
}
