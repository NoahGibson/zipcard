import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {HeaderComponent} from '@app/shared/components/header/header.component';
import {ResumeChooserComponent} from '@app/shared/components/resume-chooser/resume-chooser.component';
import {ResumePreviewComponent} from '@app/shared/components/resume-preview/resume-preview.component';
import {TextInputComponent} from '@app/shared/components/text-input/text-input.component';
import {SectionCardComponent} from '@app/shared/components/section-card/section-card.component';
import {ButtonComponent} from '@app/shared/components/button/button.component';
import {SafePipe} from '@app/shared/pipes/safe.pipe';
import {ExpandableDirective} from '@app/shared/directives/expandable/expandable.directive';
import {MessageDirective} from '@app/shared/directives/message/message.directive';

/**
 * Module containing all aspects of the app that are not particular to any one feature or module of
 * the application.
 */
@NgModule({
    declarations: [
        HeaderComponent,
        ResumeChooserComponent,
        ResumePreviewComponent,
        TextInputComponent,
        SectionCardComponent,
        ButtonComponent,
        SafePipe,
        ExpandableDirective,
        MessageDirective
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    exports: [
        HeaderComponent,
        ResumeChooserComponent,
        ResumePreviewComponent,
        TextInputComponent,
        SectionCardComponent,
        ButtonComponent,
        SafePipe,
        ExpandableDirective,
        MessageDirective
    ]
})
export class SharedModule {
}
