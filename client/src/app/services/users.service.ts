import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {GlobalService} from './global.service';
import {UserModel} from '../models/user';
import {LoginService} from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    public url: string;
    public token: string;
    public identity: string;

    constructor(private http: HttpClient, public global: GlobalService,
                private loginService: LoginService) {
        this.url = global.url;
    }

    register(user: UserModel): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let url = this.url + 'register';
        return this.http.post(url, params, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }

    update(user: UserModel): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'update-user/' + user['_id'];
        return this.http.put(url, params, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }

    getOne(id) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'user/' + id;
        return this.http.get(url, {headers: headers})
            .pipe(map(data => data['datos']));
    }

    getAll(page = null, active) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'users/' + page;
        let params = new HttpParams({
            fromObject: {
                active: active
            }
        });
        return this.http.get(url, {headers: headers, params: params})
            .pipe(map(data => data));
    }

    delete(user) {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.loginService.getToken());
        let url = this.url + 'delete-user/' + user['_id'];
        return this.http.delete(url, {headers: headers})
            .pipe(map(response => {
                return response
            }));
    }

}
