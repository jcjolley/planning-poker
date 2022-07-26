import {Component, Input} from '@angular/core'
import {User} from "../../objects/user";
import {PointValue} from "../../objects/PointValue";

@Component({
    selector: 'participant',
    templateUrl: './participant.component.html',
    styleUrls: ['./participant.component.scss'],
})
export class ParticipantComponent {
    @Input() user: User;
    @Input() flipped: boolean;
    // @Input() estimation: number
}
