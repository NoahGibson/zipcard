import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginPage} from './login.page';
import {LoginPagePopupComponent} from './components/login-page-popup/login-page-popup.component';
import {LoginPopupComponent} from './components/login-popup/login-popup.component';
import {SignupPopupComponent} from './components/signup-popup/signup-popup.component';

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
        LoginPopupComponent,
        SignupPopupComponent
    ]
})
export class LoginPageModule {}
