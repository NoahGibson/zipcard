import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

import {AuthService} from '@app/core/auth';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    constructor(private router: Router,
                private menuCtrl: MenuController,
                private authService: AuthService) {}

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
