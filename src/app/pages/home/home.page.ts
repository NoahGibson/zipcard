import {Component} from '@angular/core';

import {AlertService, CurrentUserService} from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(public currentUserService: CurrentUserService,
                private alertService: AlertService) {}

    async displayMessage() {
        await this.alertService.presentAlertWithButtons(
            '',
            '',
            'This is a test message popup',
            [
                {
                    text: 'Confirm'
                },
                {
                    text: 'Cancel'
                }
            ]
        );
    }

}
