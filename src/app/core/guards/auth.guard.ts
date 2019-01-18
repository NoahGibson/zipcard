import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthService} from '@app/core/auth';

/**
 * Application authentication guard, which specifies what a user can access given their
 * current authentication state.
 */
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    /**
     * @ignore
     */
    constructor(private router: Router, private authService: AuthService) {}

    /**
     * Specifies whether or not the current user can activate a certain location
     * of the application.
     *
     * @returns True if the current user can activate a location; false otherwise
     */
    public canActivate(): boolean {
        return this.authService.authenticated();
    }
}
