import {Injectable} from '@angular/core';
import {LinkedIn} from '@ionic-native/linkedin/ngx';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private linkedin: LinkedIn) {}

    getUser() {
        this.linkedin.getRequest('people/~')
            .then(user => {
                return user;
            })
            .catch(e => console.log('Unable to retrieve user data', e));
    }
}
