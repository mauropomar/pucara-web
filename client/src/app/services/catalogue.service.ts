import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { GlobalService } from './global.service';
import { LoginService } from "./login.service";
import { ProductModel } from "../models/product";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public url: string;

  constructor(private http: HttpClient, public global: GlobalService,
    private loginService: LoginService) {
    this.url = global.url;
  }

  getAll(page) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.loginService.getToken());
    let url = this.url + 'catalogues/'+page;    
    return this.http.get(url, { headers: headers})
      .pipe(map(data => data));
  }
}
