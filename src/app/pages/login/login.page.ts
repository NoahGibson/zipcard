import {Component} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})
export class LoginPage {

    readonly LOGIN_ACTION = 'login';
    readonly LOGIN_TITLE = 'Login';
    readonly SIGNUP_ACTION = 'signup';
    readonly SIGNUP_TITLE = 'Sign Up';

    action: any;
    actionTitle: any;

    constructor() {
        this.action = this.LOGIN_ACTION;
        this.actionTitle = this.LOGIN_TITLE;
    }

    toggleAction() {
        if (this.action === this.LOGIN_ACTION) {
            this.action = this.SIGNUP_ACTION;
            this.actionTitle = this.SIGNUP_TITLE;
        } else {
            this.action = this.LOGIN_ACTION;
            this.actionTitle = this.LOGIN_TITLE;
        }
    }

}
