import {Component, Input} from '@angular/core';

/**
 * Component for the QR popup to display when sending a user's resume.
 */
@Component({
    selector: 'app-qr-popover',
    templateUrl: './qr-popover.component.html',
    styleUrls: ['./qr-popover.component.scss'],
})
export class QRPopoverComponent {

    /**
     * The data to encode in the QR code.
     */
    @Input() qrData: string;

}
