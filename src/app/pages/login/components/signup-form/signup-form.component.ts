import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@app/core';

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

    signupError: string;
    signupForm: FormGroup;

    constructor(private authService: AuthService,
                private fb: FormBuilder) {
        this.signupForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    async signup() {
        const data = this.signupForm.value;
        const credentials = {
            email: data.email,
            password: data.password
        };
        this.signupError = await this.authService.signUpWithEmail(credentials);
    }
}
