import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<string>();

  searchFormControl = new FormControl('', [
  ]);

  constructor() { }

  ngOnInit(): void {
  }

  submit(ev: KeyboardEvent): void {
    if ( ev.keyCode === 13){
      const searchValue = this.searchFormControl.value;
      this.searchEvent.emit(searchValue);
    }
  }
}
