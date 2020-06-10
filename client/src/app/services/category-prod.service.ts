import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {GlobalService} from './global.service';
import {LoginService} from "./login.service";
import {CategoryProdModel} from "../models/category-prod";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryProdService {
  public url: string;
  constructor(private http: HttpClient, public global: GlobalService,
              private loginService: LoginService) {
    this.url = global.url;
  }

  register(category: CategoryProdModel): Observable<any> {
    let params = JSON.stringify(category);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'register-category-prod';
    return this.http.post(url, params, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }

  update(category: CategoryProdModel): Observable<any> {
    let params = JSON.stringify(category);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'update-category-prod/' + category['_id'];
    return this.http.put(url, params, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }

  getAll(active) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let page = 1;
    let url = this.url + 'category-prods/'+page;
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
    let url = this.url + 'category-prod/' + id;
    return this.http.get(url, {headers: headers})
        .pipe(map(data => data['datos']));
  }

  delete(category) {
    let params = JSON.stringify(category);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'delete-category-prod/' + category['_id'];
    return this.http.delete(url, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }
}
