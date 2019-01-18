import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {SharedModule} from '@app/shared';

import {ProfilePage} from './profile.page';

/**
 * Module containing all elements specific to the [Profile Page]{@link ProfilePage} functionality.
 */
@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProfilePage
            }
        ])
    ],
    declarations: [
        ProfilePage
    ]
})
export class ProfilePageModule {}
