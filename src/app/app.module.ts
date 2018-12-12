import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {IonicStorageModule} from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LinkedIn } from '@ionic-native/linkedin/ngx';

import {AuthGuard, AuthService, CoreModule, SettingsService, UserService} from '@app/core';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        CoreModule,
        IonicStorageModule.forRoot()
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        LinkedIn,
        AuthService,
        AuthGuard,
        UserService,
        SettingsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
