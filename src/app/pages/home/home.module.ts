import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {SharedModule} from '@app/shared';
import {QRPopoverComponent} from '@app/pages/home/components/qr-popover/qr-popover.component';
import {QRCodeModule} from 'angularx-qrcode';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        QRCodeModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            },
            {
                path: 'qr-code',
                component: QRPopoverComponent
            }
        ])
    ],
    declarations: [
        HomePage,
        QRPopoverComponent
    ]
})
export class HomePageModule {}
