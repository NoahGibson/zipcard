import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginPage} from './login.page';
import {LoginPagePopupComponent} from './components/login-page-popup/login-page-popup.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {SignupFormComponent} from './components/signup-form/signup-form.component';

/**
 * Module containing all elements specific to the [Login Page]{@link LoginPage} functionality.
 */
@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginPage
            }
        ])
    ],
    declarations: [
        LoginPage,
        LoginPagePopupComponent,
        LoginFormComponent,
        SignupFormComponent
    ]
})
export class LoginPageModule {}
