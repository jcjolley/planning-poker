import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import { Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { PointValue } from '../objects/PointValue'
import { Room } from '../objects/Room'
import { User } from '../objects/user'
import { CwPokerApi } from '../services/cw-poker.api'
import {UserService} from "../services/user-service.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'poking-room',
    templateUrl: './poking-room.component.html',
    styleUrls: ['./poking-room.component.scss'],
})
export class PokingRoomComponent implements OnDestroy {
    //wss://msza32vqp3.execute-api.us-west-2.amazonaws.com/Prod

    jiraCaseControl = new FormControl(null, Validators.required)

    // pointValues = Object.values(PointValue)
    pointValues = [0, 1, 2, 3, 5, 8, 13, 21, 100,]

    roomId: string | null = null;
    room: Room
    users: User[]
    // users: User[] = [
    //     { name: "Monte", estimate: PointValue.ONE },
    //     { name: "Ryan", estimate: PointValue.INFINITY },
    //     { name: "Ridzky", estimate: PointValue.ONE },
    //     { name: "Jolley", estimate: PointValue.INFINITY }
    // ];
    roomSub: Subscription | null
    thisUser: string | null
    flipped = false
    jiraCase: string | null
    allEstimationsSubmitted = false

    constructor(
        private readonly route: ActivatedRoute,
        private readonly cwPokerApi: CwPokerApi,
        private readonly userService: UserService,
        private readonly router: Router,
    ) {
        this.route.params.pipe(
            map(params => params['roomId']),
            tap(roomId => (this.roomId = roomId)),
        ).subscribe()

        this.roomSub = this.cwPokerApi.roomSub

        this.cwPokerApi.$webSocket.pipe(
            tap(room => (this.processResponse(room))),
        ).subscribe()

        this.thisUser = this.userService.userName
    }

    processResponse(room: Room) {
        console.log(room)

        // this.allEstimationsSubmitted = Object.values(room.participants).every(p => p.estimate != null)

        this.users = Object.entries(room.participants).map(
            participant => {
                return {
                    name: participant[0],
                    estimate: participant[1].estimate,
                } as User
            }
        )
        this.jiraCase = room.jiraCase
        this.flipped = room.flipped
    }

    // ngOnInit() {
    //     this.cwPokerApi.connect()
    //
    //     this.cwPokerApi.$webSocket.pipe(
    //         tap(room => (this.processResponse(room))),
    //     ).subscribe()
    //
    //     // if (this.roomId) {
    //     //     this.processResponse(this.getRoom(this.roomId))
    //     // }
    // }

    ngOnDestroy() {
        this.killWebSocket()
    }

    killWebSocket() {
        if (this.roomSub && !this.roomSub.closed)
            this.roomSub.unsubscribe()
    }

    setEstimation(estimation: PointValue) {
        if (this.roomId && this.thisUser && this.jiraCase) {
            this.cwPokerApi.setEstimation(this.thisUser, this.roomId, this.jiraCase, estimation)
        }
    }

    setJiraCase(jiraCase: string) {
        if (this.roomId) {
            this.cwPokerApi.setJiraCase(this.roomId, jiraCase)
            this.jiraCaseControl.setValue(null)
        }
    }

    revealEstimations() {
        if (this.roomId) {
            this.cwPokerApi.revealEstimations(this.roomId)
        }
    }

    leaveRoom() {
        if (this.roomId && this.thisUser) {
            this.cwPokerApi.leaveRoom(this.roomId, this.thisUser)
            this.killWebSocket()
            this.router.navigate(['home-page'])
        }
    }

    getRoom(roomId: string) {
        return this.cwPokerApi.getRoom(roomId)
    }

    // private loadRoom(room: Room) {
    //     this.users = Object.entries(room.participants).map(
    //         participant => {
    //             return {
    //                 name: participant[0],
    //                 estimate: participant[1].estimation,
    //             } as User
    //         }
    //     )
    //     this.jiraCase = room.jiraCase
    //     this.flipped = room.flipped
    // }
}
