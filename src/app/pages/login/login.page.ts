import {Component} from '@angular/core';

/**
 * The application login page.
 */
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
    notActionTitle: any;

    constructor() {
        this.action = this.LOGIN_ACTION;
        this.actionTitle = this.LOGIN_TITLE;
        this.notActionTitle = this.SIGNUP_TITLE;
    }

    toggleAction() {
        if (this.action === this.LOGIN_ACTION) {
            this.action = this.SIGNUP_ACTION;
            this.actionTitle = this.SIGNUP_TITLE;
            this.notActionTitle = this.LOGIN_TITLE;
        } else {
            this.action = this.LOGIN_ACTION;
            this.actionTitle = this.LOGIN_TITLE;
            this.notActionTitle = this.SIGNUP_TITLE;
        }
    }

}
