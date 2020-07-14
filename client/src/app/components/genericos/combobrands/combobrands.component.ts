import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { BrandService } from "../../../services/brand.service";

@Component({
  selector: 'app-combobrands',
  templateUrl: './combobrands.component.html',
  styleUrls: ['./combobrands.component.css']
})
export class CombobrandsComponent implements OnInit {
  @Input() data: any = [];
  @Input() selected: string;
  @Output() changeValue: EventEmitter<string>;
  constructor(private service: BrandService) {
    this.changeValue = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
      let select = (changes['selected']) ? changes['selected'].currentValue : null;
   // this.changeValue.emit(select);
  }

  getAll() {
    this.service.getAll(1,true)
      .subscribe(data => {
        this.data = data['datos'];
      })
  }

  seleccionar(value) {
   this.changeValue.emit(value);
  }
}
