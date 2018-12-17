import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {HeaderComponent} from '@app/shared/components/header/header.component';
import {ResumeChooserComponent} from '@app/shared/components/resume-chooser/resume-chooser.component';
import {HeaderProfileComponent} from '@app/shared/components/header-profile/header-profile.component';

@NgModule({
    declarations: [
        HeaderComponent,
        ResumeChooserComponent,
        HeaderProfileComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        HeaderComponent,
        ResumeChooserComponent,
        HeaderProfileComponent
    ]
})
export class SharedModule {
}
