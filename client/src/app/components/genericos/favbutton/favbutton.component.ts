import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-favbutton',
  templateUrl: './favbutton.component.html',
  styleUrls: ['./favbutton.component.css']
})
export class FavbuttonComponent implements OnInit {
  @Input() color: string;
  @Output() addData: EventEmitter<number>;
  @Output() clickActive: EventEmitter<boolean>;
  showAllActive:boolean = false;
  constructor() {
    this.addData = new EventEmitter();
    this.clickActive = new EventEmitter();
  }

  ngOnInit() {
  }

  showAddData(){
    this.addData.emit();
  }

  showActive(val){
    this.clickActive.emit(val);
    this.showAllActive = !val;
  }
}
