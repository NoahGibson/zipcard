import {Component, Input} from '@angular/core';

/**
 * Component for the header toolbar of the app, which includes a menu button, and
 * can include a title or custom HTML (but probably shouldn't include both).
 */
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    /**
     * The title for the header, if any.
     */
    @Input() title: String = '';

}
