import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../../services/catalogue.service';
import { GlobalService } from "../../services/global.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilService } from "../../services/util.service";
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  public lastpost: number = 0;
  public prods: any = [];
  public url: string;
  public pages;
  public page:number = 1;
  public total;

  allpost;
  notEmptyPost = true;
  notscrolly = true;

  constructor(private http: HttpClient, private spinner:NgxSpinnerService,
    private service: CatalogueService, private global: GlobalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private util: UtilService) {
    this.url = this.global.url;
  }

  ngOnInit(): void {
    this.loadInitPost();
  }

  loadInitPost() {
    this.service.getAll(this.page)
      .subscribe(data => {
        this.prods = data['datos'];
        this.total = data['total'];
        this.pages = data['pages'];
      })
     /* const url = 'http://tlino.96.lt/api/getblogpost';
      this.http.get(url).subscribe(data=>{
           this.allpost = data[0];
      });*/
  }

  onScroll(){
    console.log('ss')
    if(this.notscrolly && this.notEmptyPost){
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextPost()
    }
  }

  loadNextPost(){
    const url = 'http://tlino.96.lt/api/getnextpost';
    const lastpost = this.allpost[this.allpost.length -1];
    const lastpostId = lastpost.id;
    const dataSend = new FormData();
    dataSend.append('id', lastpostId);
    this.http.post(url, dataSend)
       .subscribe((data:any) =>{
           const newPost = data[0];
           this.spinner.hide();
           if(newPost.length == 0){
             this.notEmptyPost = false;
           }
           this.allpost = this.allpost.concat(newPost);
           this.notscrolly = true;
       })
  }

}
