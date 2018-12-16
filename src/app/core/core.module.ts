import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {MenuComponent} from '@app/core/menu/menu.component';
import {MenuHeaderComponent} from '@app/core/menu/menu-header/menu-header.component';

@NgModule({
    declarations: [
        MenuComponent,
        MenuHeaderComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        MenuComponent
    ]
})
export class CoreModule {
}
