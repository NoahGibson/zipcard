import {Injectable} from '@angular/core';
import {LinkedIn} from '@ionic-native/linkedin/ngx';
import {BehaviorSubject, Observable} from 'rxjs';

import {AuthService} from '@app/core/auth';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private DEFAULT_USER = {
        firstName: '',
        lastName: '',
        id: '',
        headline: '',
        pictureUrl: ''
    };

    private _user: BehaviorSubject<any> = new BehaviorSubject(this.DEFAULT_USER);
    public readonly user: Observable<any> = this._user.asObservable();

    constructor(private linkedin: LinkedIn, private authService: AuthService) {
        this.authService.authState.subscribe((state) => {
            if (state) {
                this.fetchUserData();
            }
        });
    }

    private async fetchUserData() {
        try {
            const data: {
                firstName,
                lastName,
                id,
                headline,
                pictureUrls
            } = await this.linkedin.getRequest('people/~:(id,first-name,last-name,headline,picture-urls::(original))');
            const user = {
                firstName: data.firstName,
                lastName: data.lastName,
                id: data.id,
                headline: data.headline,
                pictureUrl: data.pictureUrls.values[0]
            };
            this._user.next(user);
        } catch (e) {
            console.log('Unable to fetch user data', e);
        }
    }

}

