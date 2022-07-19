import {Component, Input} from '@angular/core'
import {PointValue} from "../../objects/PointValue"

@Component({
    selector: 'participant',
    templateUrl: './participant.component.html',
    styleUrls: ['./participant.component.scss'],
})
export class ParticipantComponent {
    //wss://msza32vqp3.execute-api.us-west-2.amazonaws.com/Prod
    @Input() userName: string;
    @Input() pointValue: PointValue;

}
