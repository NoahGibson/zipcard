import {Component, Input} from '@angular/core';

/**
 * Component representing a section of the DOM that can be expanded and collapsed.
 */
@Component({
    selector: 'app-expandable',
    templateUrl: './expandable.component.html',
    styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent {

    /**
     * Whether or not this component should currently be expanded.
     */
    @Input() expanded = false;

}
