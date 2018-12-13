import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

import {AuthService} from '@app/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();

      // Subscribe to authService to automatically navigate on login/logout
      this.authService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  goToHome() {
    this.router.navigate(['home']);
    this.menuCtrl.close();
  }

  goToSettings() {
    this.router.navigate(['settings']);
    this.menuCtrl.close();
  }

  isLoggedIn() {
    return this.authService.authenticated();
  }

  logout() {
    this.authService.logout();
  }

}
