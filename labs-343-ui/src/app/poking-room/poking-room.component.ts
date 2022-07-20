import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { PointValue } from '../objects/PointValue'
import { Room } from '../objects/Room'
import { User } from '../objects/user'
import { CwPokerApi } from '../services/cw-poker.api'

@Component({
    selector: 'poking-room',
    templateUrl: './poking-room.component.html',
    styleUrls: ['./poking-room.component.scss'],
})
export class PokingRoomComponent {
    //wss://msza32vqp3.execute-api.us-west-2.amazonaws.com/Prod
    roomId: string | null = null;
    users: User[] = [{ name: "Monte", estimate: PointValue.ONE }, { name: "Ryan", estimate: PointValue.INFINITY },
    { name: "Ridzky", estimate: PointValue.ONE }, { name: "Jolley", estimate: PointValue.INFINITY }];
    roomSub: Subscription | null

    constructor(
        private readonly route: ActivatedRoute,
        private readonly cwPokerApi: CwPokerApi,
    ) {
        this.route.params.pipe(
            map(params => params['roomId']),
            tap(roomId => (this.roomId = roomId)),
        ).subscribe()

        this.roomSub = this.cwPokerApi.roomSub

        this.cwPokerApi.$webSocket.pipe(
            tap(room => (this.processResponse(room))),
        )
    }

    processResponse(room: Room) {
        console.log(room)
    }

    ngOnDestroy() {
        this.killWebSocket()
    }

    killWebSocket() {
        if (this.roomSub && !this.roomSub.closed)
            this.roomSub.unsubscribe()
    }
}
