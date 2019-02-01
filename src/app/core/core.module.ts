import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {AuthService} from '@app/core/auth';
import {AuthGuard} from '@app/core/guards';
import {NavigationService} from '@app/core/navigation';
import {
    ResumeService,
    SettingsService,
    UserService,
    CurrentUserService
} from '@app/core/services';
import {MenuModule} from '@app/core/menu/menu.module';
import {MenuComponent} from '@app/core/menu/menu.component';

/**
 * Module containing elements of the app that need to only be, and are only, imported once
 * within the application.
 */
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        IonicModule,
        MenuModule
    ],
    exports: [
        MenuComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        NavigationService,
        UserService,
        CurrentUserService,
        SettingsService,
        ResumeService
    ]
})
export class CoreModule {

    /**
     * The constructor checks to make sure that the CoreModule has not already
     * been imported previously, throwing an error if it has.
     * @ignore
     */
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in AppModule only.'
            );
        }
    }

    /**
     * Function to separate providers from the module to prevent re-imports of providers.
     */
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: []
        };
    }

}
