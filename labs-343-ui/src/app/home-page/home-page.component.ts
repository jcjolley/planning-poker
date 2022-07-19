import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { of } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'
import { CwPokerApi } from '../services/cw-poker.api'
import { UserService } from '../services/user-service.service'

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  roomControl = new FormControl(null);
  constructor(
    private readonly userService: UserService,
    private readonly cwPokerApi: CwPokerApi,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  createRoom() {
    if (this.userService.userName) {
      this.cwPokerApi.createRoom(this.userService.userName).pipe(
        switchMap(roomId => this.joinRoom(roomId)),
      ).subscribe()
    }
  }

  joinRoom(roomId: string) {
    if (this.userService.userName) {
      return this.cwPokerApi.joinRoom(this.userService.userName, roomId).pipe(
        tap(() => {
          this.router.navigate([`poking-room/${roomId}`])
        }),
      )
    }
    return of(null)
  }

}
