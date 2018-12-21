import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {IonicStorageModule} from '@ionic/storage';
import {File} from '@ionic-native/file/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LinkedIn } from '@ionic-native/linkedin/ngx';
import {Chooser} from '@ionic-native/chooser/ngx';

import {
    AuthGuard,
    AuthService,
    CoreModule,
    NavigationService,
    ResumeService,
    SettingsService,
    UserService
} from '@app/core';
import {SharedModule} from '@app/shared';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        CoreModule,
        SharedModule,
        IonicStorageModule.forRoot()
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        LinkedIn,
        Chooser,
        File,
        FileTransfer,
        AuthService,
        AuthGuard,
        NavigationService,
        UserService,
        SettingsService,
        ResumeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
