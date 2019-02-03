import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

/**
 * Directive for making an element expandable.
 */
@Directive({
    selector: '[appExpandable]'
})
export class ExpandableDirective implements OnChanges {

    /**
     * Whether or not the html attached to this directive should currently be expanded.
     */
    @Input('appExpandable') expanded = false;

    /**
     * @ignore
     */
    constructor(private el: ElementRef) {}

    /**
     * Handling changing of input property.
     */
    ngOnChanges(): void {
        if (this.expanded) {
            this.el.nativeElement.style.height = 'auto';
        } else {
            this.el.nativeElement.style.height = '0';
        }
    }

}
