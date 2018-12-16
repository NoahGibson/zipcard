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

    private activePage = 'home';

    constructor(private router: Router,
                private menuCtrl: MenuController,
                private authService: AuthService) {}

    async goTo(page: string) {
        this.activePage = page;
        await this.router.navigate([page]);
        this.menuCtrl.close();
    }

    pageIsActive(page: string) {
        return page === this.activePage;
    }

    isLoggedIn() {
      return this.authService.authenticated();
    }

    logout() {
      this.authService.logout();
    }

}
