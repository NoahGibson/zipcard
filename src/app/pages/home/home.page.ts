import {Component} from '@angular/core';

import {AuthService} from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(public authService: AuthService) {}

}
