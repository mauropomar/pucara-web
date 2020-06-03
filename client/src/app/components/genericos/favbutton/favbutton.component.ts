import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-favbutton',
  templateUrl: './favbutton.component.html',
  styleUrls: ['./favbutton.component.css']
})
export class FavbuttonComponent implements OnInit {
  @Input() color: string;
  @Output() mostrarNueva: EventEmitter<number>;
  @Output() showActive: EventEmitter<boolean>;
  showAllActive:boolean = true;
  constructor() {
    this.mostrarNueva = new EventEmitter();
    this.showActive = new EventEmitter();
  }

  ngOnInit() {
  }

  mostrarVentanaNueva(){
    this.mostrarNueva.emit();
  }

  mostrarActivos(val){
    this.showAllActive = val;
    this.showActive.emit(val);
  }
}
