import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-space',
  templateUrl: './auth-space.component.html',
  styleUrls: ['./auth-space.component.css']
})
export class AuthSpaceComponent implements OnInit {
  selected = 0;
  constructor() { }

  ngOnInit(): void {
  }

  changeTab(): void {
    this.selected === 0 ? this.selected = 1 : this.selected = 0;
  }
}
