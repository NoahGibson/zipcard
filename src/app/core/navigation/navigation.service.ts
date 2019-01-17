import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';

import {AuthService} from '@app/core/auth';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private activePage = 'home';
    private previousPage = '';

    constructor(private platform: Platform,
                private router: Router,
                private authService: AuthService) {
        // // Register what action to perform on hitting back button
        // this.platform.backButton.subscribe(() => {
        //     if (this.activePage !== 'home' && this.activePage !== 'login') {
        //         this.navigate(this.previousPage);
        //     } else {
        //         // TODO - exit app
        //     }
        // });

        // Subscribe to authService to automatically navigate on login/logout
        this.authService.authState$.subscribe((authenticated) => {
            if (authenticated) {
                this.navigate('home');
            } else {
                this.navigate('login');
            }
        });
    }

    public async navigate(page: string) {
        await this.router.navigate([page]);
        this.previousPage = this.activePage;
        this.activePage = page;
    }

    public getActivePage() {
        return this.activePage;
    }

}
