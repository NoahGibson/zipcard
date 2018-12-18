import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {PdfViewerModule} from 'ng2-pdf-viewer';

import { HomePage } from './home.page';
import {SharedModule} from '@app/shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        PdfViewerModule,
        RouterModule.forChild([
              {
                path: '',
                component: HomePage
              }
        ])
    ],
    declarations: [HomePage]
})
export class HomePageModule {}
