import {Component, Input} from '@angular/core'
import {PointValue} from "../../objects/PointValue"
import {User} from "../../objects/user";

@Component({
    selector: 'participant',
    templateUrl: './participant.component.html',
    styleUrls: ['./participant.component.scss'],
})
export class ParticipantComponent {
    @Input() user: User;

}
