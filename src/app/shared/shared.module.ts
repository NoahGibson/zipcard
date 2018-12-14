import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {HeaderComponent} from '@app/shared/components/header/header.component';
import {ZipcardComponent} from '@app/shared/components/zipcard/zipcard.component';
import {ResumeChooserComponent} from '@app/shared/components/resume-chooser/resume-chooser.component';

@NgModule({
    declarations: [
        HeaderComponent,
        ZipcardComponent,
        ResumeChooserComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        HeaderComponent,
        ZipcardComponent,
        ResumeChooserComponent
    ]
})
export class SharedModule {
}
