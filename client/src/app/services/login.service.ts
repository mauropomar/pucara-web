import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {GlobalService} from './global.service';
import {LoginModel} from "../models/login";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public url: string;
    constructor(private http: HttpClient, public global: GlobalService) {
        this.url = global.url;
    }

  auth(user:LoginModel, gettoken = null): Observable<any>{
    if(gettoken != null){
      user['gettoken'] = gettoken;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = this.url + 'login';
    return this.http.post(url, params, {headers:headers})
        .pipe(map(response=> {
          return response
        }));
  }

  getToken() {
    let token = localStorage.getItem('token');
    token = (token != 'undefined') ? token : null;
    return token;
  }

  getIdentity() {
    let identity = localStorage.getItem('identity');
    identity = (identity != 'undefined') ? identity : null;
    return identity;
  }

}
