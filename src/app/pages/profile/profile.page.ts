import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

import {AuthService, User, UserService} from '@app/core';

/**
 * A user's profile page, where they can edit their information.
 */
@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss']
})
export class ProfilePage {

    updateProfileForm: FormGroup;
    updateProfileError: string;

    private _currentUser: User;
    private _currentUserSubscription: Subscription;

    constructor(public authService: AuthService,
                private userService: UserService,
                private fb: FormBuilder) {
        this._currentUserSubscription = this.authService.currentUser$.subscribe((user) => {
            this._currentUser = user;
        });

        this.updateProfileForm = fb.group({
            firstName: [this._currentUser.firstName, Validators.compose([Validators.required])],
            lastName: [this._currentUser.lastName, Validators.compose([Validators.required])]
        });

    }

    private ionViewWillLeave() {
        this._currentUserSubscription.unsubscribe();
    }


    public updateProfile(): void {
        const data = this.updateProfileForm.value;
        if (!data.firstName || !data.lastName) {
            return;
        }
        const userPartial = {
            firstName: data.firstName,
            lastName: data.lastName
        };
        this.userService.updateUser(this._currentUser.uid, userPartial);
    }
}
