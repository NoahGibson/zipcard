import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {HeaderComponent} from '@app/shared/components/header/header.component';
import {ZipcardComponent} from '@app/shared/components/zipcard/zipcard.component';
import {ResumeChooserComponent} from '@app/shared/components/resume-chooser/resume-chooser.component';
import {MenuHeaderComponent} from '@app/shared/components/menu-header/menu-header.component';

@NgModule({
    declarations: [
        HeaderComponent,
        ZipcardComponent,
        ResumeChooserComponent,
        MenuHeaderComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        HeaderComponent,
        ZipcardComponent,
        ResumeChooserComponent,
        MenuHeaderComponent
    ]
})
export class SharedModule {
}
