import {Injectable} from '@angular/core';
import {LinkedIn} from '@ionic-native/linkedin/ngx';
import {BehaviorSubject} from 'rxjs';

import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    userData = new BehaviorSubject({id: '', firstName: '', lastName: ''});
    userSettings = {sendReceive: 'sr'};

    constructor(private storage: Storage, private linkedin: LinkedIn) {
        this.linkedin.getRequest('people/~')
            .then(user => {
                // Getting user profile data from linkedin
                this.userData.next(user);
            })
            .then(() => {
                // Getting user settings from local storage, creating if doesn't exist
                this.storage.get(this.userData.value.id).then((user) => {
                    if (user) {
                        this.userSettings = user;
                    } else {
                        this.storage.set(this.userData.value.id, this.userSettings);
                    }
                });
            })
            .catch(e => console.log('Unable to retrieve user data', e));
    }

    getUserName() {
        return {
            firstName: this.userData.value.firstName,
            lastName: this.userData.value.lastName
        };
    }

    getUserSr() {
        return this.userSettings.sendReceive;
    }

    setUserSr(sendReceive: string) {
        if (sendReceive.match(/sr|so|ro/)) {
            this.storage.set(this.userData.value.id, {sendReceive: sendReceive})
                .then(() => {
                    this.userSettings.sendReceive = sendReceive;
                })
                .catch(e => console.log('Unable to update user settings', e));
        }
    }

}
