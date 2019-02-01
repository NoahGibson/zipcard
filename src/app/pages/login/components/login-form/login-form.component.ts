import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@app/core';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

    loginForm: FormGroup;
    loginError: string;

    constructor(private authService: AuthService,
                private fb: FormBuilder) {
        this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    async login() {
        const data = this.loginForm.value;
        if (!data.email) {
            return;
        }
        const credentials = {
            email: data.email,
            password: data.password
        };
        try {
            await this.authService.signInWithEmail(credentials);
        } catch (e) {
            this.loginError = e.message;
        }
    }

}
