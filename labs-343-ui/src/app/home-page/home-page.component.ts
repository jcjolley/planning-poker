import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { tap } from 'rxjs/operators'
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

  joinRoom(roomId: string) {
    if (this.userService.userName) {
      this.cwPokerApi.roomSub = this.cwPokerApi.joinRoom(this.userService.userName, roomId).pipe(
        tap(() => {
          this.router.navigate([`poking-room/${roomId}`])
        }),
      ).subscribe()
    }
  }

  createRoom() {
    const userName = this.userService.userName
    if (userName) {
      this.cwPokerApi.roomSub = this.cwPokerApi.createRoom(userName).pipe(
        tap(({ roomId }) => {
          this.router.navigate([`poking-room/${roomId}`])
        }),
      ).subscribe()
    }
  }

}
