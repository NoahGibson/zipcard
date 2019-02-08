import {Component, Input} from '@angular/core';

/**
 * Custom button component for application.
 */
@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

    /**
     * The type of the button, i.e. button, reset, or submit.
     */
    @Input() type: string;

    /**
     * Whether or not the button is disabled.
     */
    @Input() disabled = false;

    /**
     * The color of the button.
     */
    @Input() color: string;

    /**
     * How to fill the button, i.e. clear, outline, solid.
     */
    @Input() fill: string;

    /**
     * The size of the button, i.e. small, medium, large.
     */
    @Input() size: string;

    /**
     * Whether or not the button should expand to a full width.
     */
    @Input() expand = false;

    /**
     * Whether or not the button should stretch to a full height.
     */
    @Input() stretch = false;

    /**
     * If true, the button will have a heavier font weight.
     */
    @Input() strong = false;

}
