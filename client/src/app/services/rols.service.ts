import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {GlobalService} from './global.service';
import {LoginService} from "./login.service";
import {RolModel} from "../models/rol";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RolService {
  public url: string;
  constructor(private http: HttpClient, public global: GlobalService,
              private loginService: LoginService) {
    this.url = global.url;
  }

  register(rol: RolModel): Observable<any> {
    let params = JSON.stringify(rol);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'register-rol';
    return this.http.post(url, params, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }

  update(rol: RolModel): Observable<any> {
    let params = JSON.stringify(rol);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'update-rol/' + rol['_id'];
    return this.http.put(url, params, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }

  getAll(active) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let page = 1;
    let url = this.url + 'rols/'+page;
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
    let url = this.url + 'rol/' + id;
    return this.http.get(url, {headers: headers})
        .pipe(map(data => data['datos']));
  }

  delete(rol) {
    let params = JSON.stringify(rol);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.loginService.getToken());
    let url = this.url + 'delete-rol/' + rol['_id'];
    return this.http.delete(url, {headers: headers})
        .pipe(map(response => {
          return response
        }));
  }
}
