import {Component} from '@angular/core';
import {UserService} from '@app/core';

@Component({
    selector: 'app-menu-header',
    templateUrl: './menu-header.component.html',
    styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent {

    constructor(public userService: UserService) {}

}
