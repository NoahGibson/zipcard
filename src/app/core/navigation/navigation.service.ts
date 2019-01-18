import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';

import {AuthService} from '@app/core/auth';

/**
 * Service for handling navigation through the app.
 */
@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    /**
     * The currently active page.
     * @ignore
     */
    private activePage = 'home';

    /**
     * The previous page the user was on.
     * @ignore
     */
    private previousPage = '';

    /**
     * @ignore
     */
    constructor(private platform: Platform,
                private router: Router,
                private authService: AuthService) {
        // TODO - add handling of user pressing back on their phone
        // Subscribe to authService to automatically navigate on login/logout
        this.authService.authState$.subscribe((authenticated) => {
            if (authenticated) {
                this.navigate('home');
            } else {
                this.navigate('login');
            }
        });
    }

    /**
     * Navigates the application to the specified page.
     *
     * @param {string} page The name of the page to navigate to
     */
    public async navigate(page: string): Promise<void> {
        await this.router.navigate([page]);
        this.previousPage = this.activePage;
        this.activePage = page;
    }

    /**
     * Returns the name of the currently active page.
     *
     * @returns {string} The name of the currently active page
     */
    public getActivePage(): string {
        return this.activePage;
    }

}
