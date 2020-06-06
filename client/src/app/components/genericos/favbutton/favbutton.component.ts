import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-favbutton',
  templateUrl: './favbutton.component.html',
  styleUrls: ['./favbutton.component.css']
})
export class FavbuttonComponent implements OnInit {
  @Input() color: string;
  @Output() addData: EventEmitter<number>;
  @Output() showActive: EventEmitter<boolean>;
  showAllActive:boolean = true;
  constructor() {
    this.addData = new EventEmitter();
    this.showActive = new EventEmitter();
  }

  ngOnInit() {
  }

  showAddData(){
    this.addData.emit();
  }

  showActiveOption(val){
    this.showAllActive = val;
    this.showActive.emit(val);
  }
}
