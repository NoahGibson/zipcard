import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

/**
 * Directive to turn an element into an info, warning, or error message.
 */
@Directive({
    selector: '[appMessage]'
})
export class MessageDirective implements OnChanges {

    /**
     * The type of the message, either info, success, warning, or error.
     */
    @Input('appMessage') type: 'info' | 'success' | 'warning' | 'error' = 'info';

    /**
     * @ignore
     */
    constructor(private el: ElementRef) {}

    /**
     * Triggered each time the type of the message is changed.
     * @ignore
     */
    ngOnChanges(): void {
        if (this.type === 'info') {
            this.setInfoStyle();
        } else if (this.type === 'success') {
            this.setSuccessStyle();
        } else if (this.type === 'warning') {
            this.setWarningStyle();
        } else {
            this.setErrorStyle();
        }
    }

    /**
     * Sets the style of the element to info.
     * @ignore
     */
    private setInfoStyle(): void {
        this.el.nativeElement.style.color = 'var(--ion-color-primary)';
    }

    /**
     * Sets the style of the element to success.
     * @ignore
     */
    private setSuccessStyle(): void {
        this.el.nativeElement.style.color = 'var(--ion-color-success)';
    }

    /**
     * Sets the style of the element to warning.
     * @ignore
     */
    private setWarningStyle(): void {
        this.el.nativeElement.style.color = 'var(--ion-color-warning)';
    }

    /**
     * Sets the style of the element to error.
     * @ignore
     */
    private setErrorStyle(): void {
        this.el.nativeElement.style.color = 'var(--ion-color-danger)';
    }

}
