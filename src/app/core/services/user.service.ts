import {Injectable} from '@angular/core';
import {LinkedIn} from '@ionic-native/linkedin/ngx';
import {BehaviorSubject, Observable} from 'rxjs';

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

    private _picture_url: BehaviorSubject<string> = new BehaviorSubject('');
    public readonly picture_url: Observable<string> = this._picture_url.asObservable();

    constructor(private linkedin: LinkedIn) {
        this.fetchUserData();
    }

    private async fetchUserData() {
        try {
            // Getting basic profile data
            const user = await this.linkedin.getRequest('people/~');
            this._firstName.next(user.firstName);
            this._lastName.next(user.lastName);
            this._id.next(user.id);
            // Getting profile image
            const profile_img = await this.linkedin.getRequest(`people/${this._id.value}/picture-url`);
            this._picture_url.next(profile_img);
        } catch (e) {
            console.log('Unable to fetch user data', e);
        }
    }

}
