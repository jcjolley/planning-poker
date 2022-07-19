import {Component, Input} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {combineLatest, Subscription} from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { PointValue } from '../objects/PointValue'
import { User } from '../objects/user'
import { CwPokerApi } from '../services/cw-poker.api'

@Component({
    selector: 'poking-room',
    templateUrl: './poking-room.component.html',
    styleUrls: ['./poking-room.component.scss'],
})
export class PokingRoomComponent {
    //wss://msza32vqp3.execute-api.us-west-2.amazonaws.com/Prod
    @Input() thisUser: string;
    roomId: string | null = null;
    users: User[] = [{name: "Monte", estimate: PointValue.ONE}, {name: "Ryan", estimate: PointValue.INFINITY},
        {name: "Ridzky", estimate: PointValue.ONE}, {name: "Jolley", estimate: PointValue.INFINITY}];
    roomSub: Subscription;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly cwPokerApi: CwPokerApi,
    ) {
        const $roomId = this.route.params.pipe(
            map(params => params['roomId']),
            tap(roomId => (this.roomId = roomId)),
        )

        // this.roomSub = combineLatest([$roomId, this.cwPokerApi.$webSocket]).pipe(
        //     tap(([roomId, response]) => this.processResponse(roomId, response)),
        // ).subscribe();
    }

    processResponse(roomId: string, response: unknown) {
        console.log(response);
    }

    ngOnDestroy() {
        this.killWebSocket();
    }

    killWebSocket() {
        if (this.roomSub && !this.roomSub.closed)
            this.roomSub.unsubscribe();
    }
}
