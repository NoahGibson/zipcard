import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '@app/core/auth';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private activePage = 'home';

    constructor(private router: Router,
                private authService: AuthService) {
        // Subscribe to authService to automatically navigate on login/logout
        this.authService.authState.subscribe((authenticated) => {
            if (authenticated) {
                this.navigate('home');
            } else {
                this.navigate('login');
            }
        });
    }

    public async navigate(page: string) {
        await this.router.navigate([page]);
        this.activePage = page;
    }

    public getActivePage() {
        return this.activePage;
    }

}
