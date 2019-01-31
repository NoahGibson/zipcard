import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@app/core';

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

    // The error message, if any, when trying to sign up
    signupError: string;

    // The sign up form group
    signupForm: FormGroup;

    constructor(private authService: AuthService,
                private fb: FormBuilder) {
        this.signupForm = fb.group({
            fullName: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    /*
        Handle sign up.
     */
    async signup(): Promise<void> {
        const data = this.signupForm.value;
        if (data.password !== data.confirmPassword) {
            this.signupError = 'Password and Confirm Password do not match.';
            return;
        }
        const credentials = {
            email: data.email,
            password: data.password
        };
        try {
            await this.authService.signUpWithEmail(credentials, data.fullName);
        } catch (e) {
            this.signupError = e.message;
        }
    }
}
