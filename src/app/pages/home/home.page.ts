import {Component} from '@angular/core';

import {AuthService, UserService} from '@app/core';
import {Chooser} from '@ionic-native/chooser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    resume = '';

    constructor(public userService: UserService,
                private authService: AuthService,
                private chooser: Chooser) {
    }

    logout() {
        this.authService.logout();
    }

    async choose() {
        /*
            NOTE: currently bug with ionic native plugin, so have to use cordova plugin
            directly instead. See: https://github.com/ionic-team/ionic-native/issues/2768
         */
        const file = await (<any>window).chooser.getFile('application/pdf');
        this.resume = file.name;
    }

}
