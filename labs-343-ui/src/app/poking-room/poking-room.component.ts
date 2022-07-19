import {Component} from '@angular/core'
import {User} from "../objects/user";
import {PointValue} from "../objects/PointValue";

@Component({
    selector: 'poking-room',
    templateUrl: './poking-room.component.html',
    styleUrls: ['./poking-room.component.scss'],
})
export class PokingRoomComponent {
    //wss://msza32vqp3.execute-api.us-west-2.amazonaws.com/Prod
    users: User[] = [{name: "Monte", pointValue: PointValue.ONE}, {name: "Ryan", pointValue: PointValue.INFINITY}];
}
