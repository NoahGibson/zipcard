import {Component} from '@angular/core';
import {MenuController} from '@ionic/angular';

import {AuthService} from '@app/core/auth';
import {NavigationService} from '@app/core/navigation';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    readonly MENU_PAGES = [
        {
            page: 'home',
            name: 'Home',
            icon: 'home'
        },
        {
            page: 'settings',
            name: 'Settings',
            icon: 'settings'
        }
    ];

    constructor(private navService: NavigationService,
                private menuCtrl: MenuController,
                private authService: AuthService) {}

    async goTo(page: string) {
        await this.navService.navigate(page);
        this.menuCtrl.close();
    }

    pageIsActive(page: string) {
        return page === this.navService.getActivePage();
    }

    isLoggedIn() {
      return this.authService.authenticated();
    }

    logout() {
      this.authService.signOut();
    }

}
