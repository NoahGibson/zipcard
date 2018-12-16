import {Injectable} from '@angular/core';
import {LinkedIn} from '@ionic-native/linkedin/ngx';
import {BehaviorSubject, Observable} from 'rxjs';

import {AuthService} from '@app/core/auth';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private _firstName: BehaviorSubject<string> = new BehaviorSubject('');
    public readonly firstName: Observable<string> = this._firstName.asObservable();

    private _lastName: BehaviorSubject<string> = new BehaviorSubject('');
    public readonly lastName: Observable<string> = this._lastName.asObservable();

    private _id: BehaviorSubject<string>  = new BehaviorSubject('');
    public readonly id: Observable<string> = this._id.asObservable();

    private _headline: BehaviorSubject<string> = new BehaviorSubject('');
    public readonly headline: Observable<string> = this._headline.asObservable();

    private _picture_url: BehaviorSubject<string> = new BehaviorSubject('');
    public readonly picture_url: Observable<string> = this._picture_url.asObservable();

    constructor(private linkedin: LinkedIn, private authService: AuthService) {
        this.authService.authState.subscribe((state) => {
            if (state) {
                this.fetchUserData();
            }
        });
    }

    private async fetchUserData() {
        try {
            const user: {
                firstName,
                lastName,
                id,
                headline,
                pictureUrls
            } = await this.linkedin.getRequest('people/~:(id,first-name,last-name,headline,picture-urls::(original))');
            this._firstName.next(user.firstName);
            this._lastName.next(user.lastName);
            this._id.next(user.id);
            this._headline.next(user.headline);
            this._picture_url.next(user.pictureUrls.values[0]);
        } catch (e) {
            console.log('Unable to fetch user data', e);
        }
    }

}

