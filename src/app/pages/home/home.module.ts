import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {QRCodeModule} from 'angularx-qrcode';
import {Brightness} from '@ionic-native/brightness/ngx';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

import {HomePage} from './home.page';
import {QRPopoverComponent} from './components/qr-popover/qr-popover.component';
import {SharedModule} from '@app/shared';

/**
 * Module containing all elements specific to the [Home Page]{@link HomePage} functionality.
 */
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
    ],
    providers: [
        Brightness,
        BarcodeScanner
    ]
})
export class HomePageModule {}
