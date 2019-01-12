import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '@app/core';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})
export class LoginPage {

    loginForm: FormGroup;
    loginError: string;

    constructor(private authService: AuthService,
                private fb: FormBuilder) {
        this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    login() {
        const data = this.loginForm.value;
        if (!data.email) {
            return;
        }
        const credentials = {
            email: data.email,
            password: data.password
        };
        this.authService.signInWithEmail(credentials)
            .then(
                () => { return; },
                error => { this.loginError = error.message; }
            );
    }

    logout() {
        this.authService.logout();
    }

    isAuthenticated() {
        return this.authService.authenticated();
    }
}
