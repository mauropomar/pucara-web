import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {GlobalService} from './global.service';
import {LoginService} from "./login.service";
import {ProductModel} from "../models/product";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public url: string;

    constructor(private http: HttpClient, public global: GlobalService,
                private loginService: LoginService) {
        this.url = global.url;
    }

    register(product: ProductModel): Observable<any> {
        let params = JSON.stringify(product);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'register-product';
        return this.http.post(url, params, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }

    update(product: ProductModel): Observable<any> {
        let params = JSON.stringify(product);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'update-product/' + product['_id'];
        return this.http.put(url, params, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }

    getAll(page, active) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'products/' + page;
        let params = new HttpParams({
            fromObject: {
                active: active
            }
        });
        return this.http.get(url, {headers: headers, params: params})
            .pipe(map(data => data));
    }

    getOne(id) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'product/' + id;
        return this.http.get(url, {headers: headers})
            .pipe(map(data => data['datos']));
    }

    delete(product) {
        let params = JSON.stringify(product);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'delete-product/' + product['_id'];
        return this.http.delete(url, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }
}
