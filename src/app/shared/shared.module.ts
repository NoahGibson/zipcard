import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {HeaderComponent} from '@app/shared/components/header/header.component';
import {ZipcardComponent} from '@app/shared/components/zipcard/zipcard.component';

@NgModule({
    declarations: [
        HeaderComponent,
        ZipcardComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        HeaderComponent,
        ZipcardComponent
    ]
})
export class SharedModule {
}
