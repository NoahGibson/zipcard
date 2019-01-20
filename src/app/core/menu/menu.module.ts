import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {MenuComponent} from './menu.component';
import {MenuHeaderComponent} from './menu-header/menu-header.component';

/**
 * Module containing elements specific to the menu of the application
 */
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
export class MenuModule {}
