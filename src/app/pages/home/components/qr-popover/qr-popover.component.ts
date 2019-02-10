import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-qr-popover',
    templateUrl: './qr-popover.component.html',
    styleUrls: ['./qr-popover.component.scss'],
})
export class QRPopoverComponent {

    @Input() qrData: string;

}
