import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import {AuthService} from '@app/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginPage
            }
        ])
    ],
    declarations: [LoginPage],
    providers: [
        AuthService
    ]
})
export class LoginPageModule {}
