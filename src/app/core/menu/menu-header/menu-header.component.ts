import {Component} from '@angular/core';

import {CurrentUserService} from '@app/core/services';

@Component({
    selector: 'app-menu-header',
    templateUrl: './menu-header.component.html',
    styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent {

    constructor(public currentUserService: CurrentUserService) {}

}
