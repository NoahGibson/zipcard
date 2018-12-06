import {Injectable} from '@angular/core';
import {LinkedIn} from '@ionic-native/linkedin/ngx';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    userData = new BehaviorSubject({id: '', firstName: '', lastName: ''});

    constructor(private linkedin: LinkedIn) {
        this.linkedin.getRequest('people/~')
            .then(user => {
                this.userData.next(user);
            })
            .catch(e => console.log('Unable to retrieve user data', e));
    }

    getUser() {
        return this.userData.value;
    }
}
