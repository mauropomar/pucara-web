import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../../services/catalogue.service';
import { GlobalService } from "../../services/global.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilService } from "../../services/util.service";

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

  constructor(private service: CatalogueService, private global: GlobalService,
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
  }

  onScroll(){
    debugger
    console.log('scrolled');
  }

}
