import {Component} from '@angular/core';

import {UserDataService} from '@app/core';

@Component({
    selector: 'app-header-profile',
    templateUrl: './header-profile.component.html',
    styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent {

    constructor(public userService: UserDataService) {}

}
