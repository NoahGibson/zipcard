import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {HeaderComponent} from '@app/shared/components/header/header.component';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        HeaderComponent
    ]
})
export class SharedModule {
}
