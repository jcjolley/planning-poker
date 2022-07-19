import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  roomControl = new FormControl(null);
  constructor() { }

  ngOnInit(): void {
  }

  createRoom() {}

  joinRoom() {
    
  }

}
