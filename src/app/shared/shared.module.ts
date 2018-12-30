import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {HeaderComponent} from '@app/shared/components/header/header.component';
import {ResumeChooserComponent} from '@app/shared/components/resume-chooser/resume-chooser.component';
import {HeaderProfileComponent} from '@app/shared/components/header-profile/header-profile.component';
import {SafePipe} from '@app/shared/pipes/safe.pipe';
import {ResumePreviewComponent} from '@app/shared/components/resume-preview/resume-preview.component';

@NgModule({
    declarations: [
        HeaderComponent,
        ResumeChooserComponent,
        ResumePreviewComponent,
        HeaderProfileComponent,
        SafePipe
    ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        HeaderComponent,
        ResumeChooserComponent,
        ResumePreviewComponent,
        HeaderProfileComponent,
        SafePipe
    ]
})
export class SharedModule {
}
