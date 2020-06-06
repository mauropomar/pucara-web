import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
import {RolService} from "../../../services/rols.service";


@Component({
  selector: 'app-comboroles',
  templateUrl: './comboroles.component.html',
  styleUrls: ['./comboroles.component.css']
})
export class ComborolesComponent implements OnInit {
  @Input() data: any = [];
  @Input() selected: string;
  @Output() changeValue: EventEmitter<string>;

  constructor(private service: RolService) {
    this.changeValue = new EventEmitter<string>();
  }

  ngOnInit(): void {
      this.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let select = (changes['selected']) ? changes['selected'].currentValue : null;
    this.changeValue.emit(select);
  }

  getAll() {
    this.service.getAll()
        .subscribe(data => {
          this.data = data;
        }, (error) => {

        })
  }

  seleccionar(value) {
    this.changeValue.emit(value);
  }
}