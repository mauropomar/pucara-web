import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-confirmdelete',
  templateUrl: './confirmdelete.component.html',
  styleUrls: ['./confirmdelete.component.css']
})
export class ConfirmdeleteComponent implements OnInit {
  @Input() message: string;
  @Output() deleteEvent: EventEmitter<number>;
  constructor(){
    this.deleteEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  accept(){
    this.deleteEvent.emit();
    $('#modalConfirmDelete').appendTo('body').modal("hide");
  }
}
