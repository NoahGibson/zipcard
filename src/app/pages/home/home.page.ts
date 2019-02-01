import {Component} from '@angular/core';

import {CurrentUserService} from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(public currentUserService: CurrentUserService) {}

}
