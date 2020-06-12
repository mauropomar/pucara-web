import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {GlobalService} from './global.service';
import {LoginService} from "./login.service";
import {BrandModel} from "../models/brand";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  public url: string;
  constructor(private http: HttpClient, public global: GlobalService,
              private loginService: LoginService) {
    this.url = global.url;
  }

  register(brand: BrandModel): Observable<any> {
    let params = JSON.stringify(brand);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'register-brand';
    return this.http.post(url, params, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }

  update(brand: BrandModel): Observable<any> {
    let params = JSON.stringify(brand);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'update-brand/' + brand['_id'];
    return this.http.put(url, params, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }

  getAll(active) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let page = 1;
    let url = this.url + 'brands/'+page;
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
    let url = this.url + 'brand/' + id;
    return this.http.get(url, {headers: headers})
        .pipe(map(data => data['datos']));
  }

  delete(brand) {
    let params = JSON.stringify(brand);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'delete-brand/' + brand['_id'];
    return this.http.delete(url, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }
}
