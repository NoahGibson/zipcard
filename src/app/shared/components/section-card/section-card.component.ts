import {Component, Input} from '@angular/core';

/**
 * Component representing a generic card to act as a section for a page.
 */
@Component({
    selector: 'app-section-card',
    templateUrl: './section-card.component.html',
    styleUrls: ['./section-card.component.scss']
})
export class SectionCardComponent {

    /**
     * The title of the card section.
     */
    @Input() title: string;

    /**
     * The subtitle of the card section.
     */
    @Input() subtitle: string;

    /**
     * Whether or not the section card should be expandable.
     */
    @Input() expandable = false;

    /**
     * Whether or not the current card is expanded.
     */
    public expanded = false;

    /**
     * @ignore
     */
    constructor() {}

    /**
     * Toggles the expanded value of the card.
     */
    onToggleExpand() {
        this.expanded = !this.expanded;
    }

}
