import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from '../services/user-service.service'

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent {
  usernameControl = new FormControl(null, Validators.required);
  title = 'CW Planning Poker'

  constructor(private router: Router, private userService: UserService) {}

  logIn() {
    this.userService.logIn(this.usernameControl.value);
    this.router.navigate(['home-page']);
  }
}
