import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {GlobalService} from "./global.service";
import {LoginService} from "./login.service";
import {CategoryCustomerModel} from "../models/category-customer";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryCustomerService {
  public url: string;
  constructor(private http: HttpClient, public global: GlobalService,
              private loginService: LoginService) {
    this.url = global.url;
  }

  register(category: CategoryCustomerModel): Observable<any> {
    let params = JSON.stringify(category);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'register-category-customer';
    return this.http.post(url, params, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }

  update(category: CategoryCustomerModel): Observable<any> {
    let params = JSON.stringify(category);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'update-category-customer/' + category['_id'];
    return this.http.put(url, params, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }

  getAll(active) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let page = 1;
    let url = this.url + 'category-customers/'+page;
    let params = new HttpParams({
      fromObject: {
        active: active
      }
    });
    return this.http.get(url, {headers: headers, params:params})
        .pipe(map(data => data['datos']));
  }

  getOne(id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'category-customer/' + id;
    return this.http.get(url, {headers: headers})
        .pipe(map(data => data['datos']));
  }

  delete(category) {
    let params = JSON.stringify(category);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'delete-category-customer/' + category['_id'];
    return this.http.delete(url, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }
}
