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
            firstName: ['', Validators.compose([Validators.required])],
            lastName: ['', Validators.compose([Validators.required])],
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
        const userAttributes = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            photoUrl: '',
            resumeUrl: ''
        };
        this.signupError = await this.authService.signUpWithEmail(credentials, userAttributes);
    }
}
