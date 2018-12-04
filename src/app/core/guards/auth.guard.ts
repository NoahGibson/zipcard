import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LinkedIn} from '@ionic-native/linkedin/ngx';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    isLoggedIn = false;

    constructor(private router: Router, private linkedin: LinkedIn) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.linkedin.hasActiveSession().then((active) => {
            this.isLoggedIn = active;
        });
        if (this.isLoggedIn) { return true; };
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
