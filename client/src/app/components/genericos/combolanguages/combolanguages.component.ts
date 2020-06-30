import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { LanguageService } from "../../../services/language.service";

@Component({
  selector: 'app-combolanguages',
  templateUrl: './combolanguages.component.html',
  styleUrls: ['./combolanguages.component.css']
})
export class CombolanguagesComponent implements OnInit {
  @Input() data: any = [];
  @Input() selected: string;
  @Output() changeValue: EventEmitter<string>;
  constructor(private service: LanguageService) {
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
    this.service.getAll(true)
      .subscribe(data => {
        this.data = data;
      })
  }

  seleccionar(value) {
   this.changeValue.emit(value);
  }
}
