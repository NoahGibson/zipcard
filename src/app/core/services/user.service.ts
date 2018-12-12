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

    constructor(private linkedin: LinkedIn) {
        this.fetchUserData();
    }

    private fetchUserData() {
        this.linkedin.getRequest('people/~')
            .then(user => {
                this._firstName.next(user.firstName);
                this._lastName.next(user.lastName);
                this._id.next(user.id);
            }).catch(e => console.log('Unable to retrieve user data', e));
    }

}
