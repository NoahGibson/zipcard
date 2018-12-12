import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-zipcard',
    templateUrl: './zipcard.component.html',
    styleUrls: ['./zipcard.component.scss']
})
export class ZipcardComponent {
    @Input() title = '';
    @Input() img = '';
    @Input() headline = '';
}
