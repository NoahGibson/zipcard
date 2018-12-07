import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {SettingsPage} from '@app/pages/settings/settings.page';
import {SharedModule} from '@app/shared';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: SettingsPage
            }
        ])
    ],
    declarations: [SettingsPage]
})
export class SettingsPageModule {}
